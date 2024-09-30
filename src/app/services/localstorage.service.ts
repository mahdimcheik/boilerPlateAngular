import { Injectable } from '@angular/core';
import { Theme } from '../components/theme-selector/theme.service';

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
  constructor() {}
}
