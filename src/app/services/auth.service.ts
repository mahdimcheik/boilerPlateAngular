import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, inject, signal } from '@angular/core';
import {
  ResponseDTO,
  UserChangePasswordDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from '../shared/Models/user/user';
import { catchError, Observable, of, tap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

type ResponseRegister = {
  succeeded: boolean;
  errors: string[];
};

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private localStorageService = inject(LocalstorageService);
  private messageService = inject(MessageService);

  router = inject(Router);

  userConnected = signal({} as UserResponseDTO);
  userToDisplay = signal({} as UserResponseDTO);
  teacherDetails = signal({} as UserResponseDTO);
  refreshAccessToken = signal<string | null>(null);
  token = signal<string>('');

  constructor() {}

  getUsers(first: number, rows: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(
      `${environment.BACK_URL}/Users/all?first=${first}&rows=${rows}`
    );
  }

  register(userDTO: UserCreateDTO): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(
      `${environment.BACK_URL}/Users/register`,
      userDTO
    );
  }

  login(userLoginDTO: UserLoginDTO): Observable<ResponseDTO> {
    return this.http
      .post<ResponseDTO>(`${environment.BACK_URL}/Users/login`, userLoginDTO)
      .pipe(
        tap((res) => {
          this.userConnected.set(
            (res.data as { token: string; user: UserResponseDTO }).user
          );
          this.token.set(
            (res.data as { token: string; user: UserResponseDTO }).token
          );
          this.refreshAccessToken.set(
            (
              res.data as {
                refreshToken: string;
                user: UserResponseDTO;
                token: string;
              }
            ).refreshToken
          );
          this.localStorageService.setUser(this.userConnected());
          this.localStorageService.setToken(this.token());
          this.localStorageService.setRefreshToken(
            this.refreshAccessToken() ?? ''
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenu ! ',
            detail: res.message ?? 'Youpi!!!',
          });
          const eventSource = new EventSource(
            `${environment.BACK_URL}/sse/${this.userConnected().id}`
          );

          eventSource.onmessage = (event) => {
            console.log('event', event);
            this.userConnected.set(JSON.parse(event.data));
          };

          if (this.userConnected().roles.includes('Admin')) {
            this.router.navigateByUrl('teacher/dashboard');
          } else {
            this.router.navigateByUrl('profile/me');
          }
        })
      );
  }
  refreshToken() {
    // Call your backend refresh token endpoint
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${environment.BACK_URL}/Users/refresh-token`,
        {
          refreshToken: this.localStorageService.getRefreshToken(),
          token: this.localStorageService.getToken(),
        }
      )
      .pipe(
        tap((tokens) => {
          console.log('response refresh token', tokens);

          // Update tokens in localStorage
          this.localStorageService.setToken(tokens.accessToken);
          this.localStorageService.setRefreshToken(tokens.refreshToken);

          // Update the access token in memory
          this.refreshAccessToken.set(tokens.accessToken);
          this.token.set(tokens.accessToken);
          console.log('new token from interceptor', this.token());
        }),
        catchError((err) => {
          // Handle refresh token errors
          this.logout();
          throw err;
        })
      );
  }

  logout(): void {
    this.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Au revoir ! ',
      detail: 'vous êtes déconnecté',
    });
    this.router.navigateByUrl('');
  }

  getprofile(): Observable<ResponseDTO> {
    // set user from localstoarage
    this.userConnected.set(this.localStorageService.getUser());
    this.token.set(this.localStorageService.getToken());

    if (this.token()) {
      return this.http
        .get<ResponseDTO>(`${environment.BACK_URL}/users/my-informations`)
        .pipe(
          tap((res) => {
            this.userConnected.set(
              (res.data as { token: string; user: UserResponseDTO }).user
            );
            // this.token.set(
            //   (res.data as { token: string; user: UserResponseDTO }).token
            // );
            this.localStorageService.setUser(this.userConnected());
            // this.localStorageService.setToken(this.token());
          })
        );
    }

    return of().pipe(tap(() => this.reset()));
  }

  getprofileById(userId: string): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(
      `${environment.BACK_URL}/users/public-informations?userId=${userId}`
    );
  }

  getTeacherProfile(userId: string): Observable<ResponseDTO> {
    return this.http
      .get<ResponseDTO>(
        `${environment.BACK_URL}/users/public-informations?userId=${environment.TEACHER_ID}`
      )
      .pipe(tap((res) => this.teacherDetails.set(res.data)));
  }

  forgotPassword(input: { email: string }): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      `${environment.BACK_URL}/users/forgot-password`,
      input
    );
  }

  resetPassword(
    changePassword: UserChangePasswordDTO
  ): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      `${environment.BACK_URL}/users/reset-password`,
      changePassword
    );
  }

  reset(): void {
    this.localStorageService.setUser({} as UserResponseDTO);
    this.userConnected.set({} as UserResponseDTO);
    this.localStorageService.setToken('');
    this.token.set('');
  }

  updatePersonnalInfos(userUpdated: UserUpdateDTO): Observable<ResponseDTO> {
    return this.http
      .patch<ResponseDTO>(`https://localhost:7113/users/update`, userUpdated)
      .pipe(
        tap((res) => {
          this.userConnected.set(res.data);
          this.userToDisplay.set(res.data);
        })
      );
  }

  updateAvatar(file: File): Observable<ResponseDTO> {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const headers = new HttpHeaders();
      return this.http.post<ResponseDTO>(
        `https://localhost:7113/users/upload-avatar`,
        formData,
        {
          headers: headers,
        }
      );
    } else return of();
  }
}
