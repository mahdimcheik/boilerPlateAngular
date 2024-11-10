import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  ResponseLoginDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserResponseDTO,
} from '../shared/Models/user/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment.development';

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

  login(userLoginDTO: UserLoginDTO): Observable<ResponseLoginDTO> {
    return this.http
      .post<ResponseLoginDTO>(
        `${environment.BACK_URL}/Users/login`,
        userLoginDTO
      )
      .pipe(
        tap((res) => {
          this.userConnected.set(res.data.user);
          this.token.set(res.data.token);
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
    this.http
      .get<ResponseLoginDTO>(`${environment.BACK_URL}/api/Users/logout`)
      .pipe(
        tap((res) => {
          this.localStorageService.setUser({} as UserResponseDTO);
          this.userConnected.set({} as UserResponseDTO);
          this.messageService.add({
            severity: 'success',
            summary: 'Au revoir ! ',
            detail: res.message ?? 'Youpi!!!',
          });
        })
      );
  }

  getprofile(): Observable<ResponseLoginDTO> {
    // set user from localstoarage
    this.userConnected.set(this.localStorageService.getUser());
    this.token.set(this.localStorageService.getToken());
    return this.http
      .get<ResponseLoginDTO>(`${environment.BACK_URL}/users/my-informations`)
      .pipe(
        tap((res) => {
          this.userConnected.set(res.data.user);
          this.token.set(res.data.token);
          this.localStorageService.setUser(this.userConnected());
          this.localStorageService.setToken(this.token());
        })
      );
  }
}
