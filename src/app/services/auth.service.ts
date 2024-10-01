import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ResponseLoginDTO,
  UserCreateDTO,
  UserLoginDTO,
} from '../shared/Models/user/user';
import { Observable, tap } from 'rxjs';
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

  constructor() {}

  register(userDTO: UserCreateDTO): Observable<ResponseRegister> {
    return this.http
      .post<ResponseRegister>('https://localhost:7103/Users/register', userDTO)
      .pipe(tap((res) => console.log(res)));
  }
  login(userLoginDTO: UserLoginDTO): Observable<ResponseLoginDTO> {
    return this.http
      .post<ResponseLoginDTO>(
        'https://localhost:7103/Users/login',
        userLoginDTO
      )
      .pipe(tap((res) => console.log(res)));
  }
}
