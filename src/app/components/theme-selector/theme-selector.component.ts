import { Component, OnInit, inject } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent implements OnInit {
  themes!: Theme[];
  themeService: ThemeService = inject(ThemeService);
  localstorageService = inject(LocalstorageService);

  activeTheme!: Theme;

  ngOnInit(): void {
    this.themes = this.themeService.allThemes;
    const theme = this.localstorageService.getTheme();
    if (theme?.id) {
      this.activeTheme = theme;
      this.themeService.activeTheme = theme;
      this.changeTheme();
    }
    this.activeTheme = this.themeService.activeTheme;
  }

  changeTheme() {
    this.themeService.changeTheme(this.activeTheme);
    this.localstorageService.setTheme(this.activeTheme);
  }
}
