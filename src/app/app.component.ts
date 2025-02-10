import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Theme, ThemeService } from './services/theme.service';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  localstorageService = inject(LocalstorageService);

  themes!: Theme[];
  private _themeService: ThemeService = inject(ThemeService);
  public get themeService(): ThemeService {
    return this._themeService;
  }
  public set themeService(value: ThemeService) {
    this._themeService = value;
  }

  activeTheme!: Theme;

  async ngOnInit() {
    try {
      this.themes = this.themeService.allThemes;
      const theme = this.localstorageService.getTheme();
      if (theme?.id) {
        this.activeTheme = theme;
        this.themeService.activeTheme = theme;
        this.changeTheme();
      }
      this.activeTheme = this.themeService.activeTheme;
      await firstValueFrom(this.authService.getprofile());
    } catch {
      this.authService.reset();
    }
  }

  changeTheme() {
    this.themeService.changeTheme(this.activeTheme);
    this.localstorageService.setTheme(this.activeTheme);
  }
}
