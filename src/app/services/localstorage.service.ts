import { Injectable } from '@angular/core';
import { Theme } from './theme.service';
import { UserResponseDTO } from '../shared/Models/user/user';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  getTheme(): Theme {
    const theme = JSON.parse(localStorage.getItem('theme') || '{}');
    return theme;
  }
  setTheme(theme: Theme) {
    localStorage.setItem('theme', JSON.stringify(theme));
  }
  setUser(user: UserResponseDTO) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): UserResponseDTO {
    return JSON.parse(localStorage.getItem('user') || '{}') as UserResponseDTO;
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }
  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }
  constructor() {}
}
