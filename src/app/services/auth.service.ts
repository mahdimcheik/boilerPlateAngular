import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ResponseLoginDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserResponseDTO,
} from '../shared/Models/user/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { MessageService } from 'primeng/api';

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

  userConnected$ = new BehaviorSubject<UserResponseDTO>({} as UserResponseDTO);

  constructor() {}

  register(userDTO: UserCreateDTO): Observable<ResponseRegister> {
    return this.http
      .post<ResponseRegister>('https://localhost:7113/users/register', userDTO)
      .pipe(tap((res) => console.log(res)));
  }

  login(userLoginDTO: UserLoginDTO): Observable<ResponseLoginDTO> {
    return this.http
      .post<ResponseLoginDTO>(
        `https://localhost:7100/api/Users/login`,
        userLoginDTO
      )
      .pipe(
        tap((res) => {
          this.userConnected$.next(res.data);
          this.localStorageService.setUser(this.userConnected$.value);
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
      .get<ResponseLoginDTO>(`https://localhost:7100/api/Users/logout`)
      .pipe(
        tap((res) => {
          this.localStorageService.setUser({} as UserResponseDTO);
          this.userConnected$.next({} as UserResponseDTO);
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
    this.userConnected$.next(this.localStorageService.getUser());
    return this.http
      .get<ResponseLoginDTO>(`https://localhost:7100/api/Users/profile`)
      .pipe(tap((res) => this.userConnected$.next(res.data)));
  }
}
