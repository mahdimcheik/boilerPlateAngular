import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ResponseLoginDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserResponseDTO,
} from '../shared/Models/user/user';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Token } from '@angular/compiler';

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
          console.log('called');
        }),
        catchError((e) => {
          console.log(e);
          return of();
        })
      );
  }

  getprofile(): Observable<ResponseLoginDTO> {
    // set user from localstoarage
    this.userConnected$.next(this.localStorageService.getUser());
    return this.http
      .get<ResponseLoginDTO>(`https://localhost:7100/api/Users/profile`)
      .pipe(
        tap((res) => this.userConnected$.next(res.data)),
        catchError((e) => {
          console.log(e);
          return of();
        })
      );
  }
}
