import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject, signal } from '@angular/core';
import {
  ResponseDTO,
  UserChangePasswordDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from '../shared/Models/user/user';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';

type ResponseRegister = {
  succeeded: boolean;
  errors: string[];
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private localStorageService = inject(LocalstorageService);
  private messageService = inject(MessageService);

  // userConnected$ = new BehaviorSubject<UserResponseDTO>({} as UserResponseDTO);
  // token$ = new BehaviorSubject<string>('');

  userConnected = signal({} as UserResponseDTO);
  token = signal<string>('');

  constructor() {}

  register(userDTO: UserCreateDTO): Observable<ResponseRegister> {
    return this.http
      .post<ResponseRegister>(`${environment.BACK_URL}/Users/register`, userDTO)
      .pipe(tap((res) => console.log(res)));
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
          this.localStorageService.setUser(this.userConnected());
          this.localStorageService.setToken(this.token());

          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenu ! ',
            detail: res.message ?? 'Youpi!!!',
          });
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
  }

  getprofile(): Observable<ResponseDTO> {
    // set user from localstoarage
    this.userConnected.set(this.localStorageService.getUser());
    this.token.set(this.localStorageService.getToken());
    console.log('token ', this.token());
    console.log('user ', this.userConnected());

    if (this.token()) {
      console.log('token on ');
      return this.http
        .get<ResponseDTO>(`${environment.BACK_URL}/users/my-informations`)
        .pipe(
          tap((res) => {
            this.userConnected.set(
              (res.data as { token: string; user: UserResponseDTO }).user
            );
            this.token.set(
              (res.data as { token: string; user: UserResponseDTO }).token
            );
            this.localStorageService.setUser(this.userConnected());
            this.localStorageService.setToken(this.token());
            console.log('mes infos ', res);
          })
        );
    }
    console.log('token off ');

    return of().pipe(tap(() => this.reset()));
  }

  forgotPassword(input: { email: string }): Observable<ResponseDTO> {
    return this.http
      .post<ResponseDTO>(`${environment.BACK_URL}/forgot-password`, input)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  resetPassword(
    changePassword: UserChangePasswordDTO
  ): Observable<ResponseDTO> {
    return this.http
      .post<ResponseDTO>(
        `${environment.BACK_URL}/password-reset`,
        changePassword
      )
      .pipe(
        tap((res) => {
          console.log(res);
        })
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
      .pipe(tap((res) => this.userConnected.set(res.data)));
  }
}
