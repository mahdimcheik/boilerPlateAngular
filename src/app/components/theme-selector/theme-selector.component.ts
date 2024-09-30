import { Component, OnInit, inject } from '@angular/core';
import { Theme, ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent implements OnInit {
  themes!: Theme[];
  themeService: ThemeService = inject(ThemeService);

  activeTheme!: Theme;

  ngOnInit(): void {
    this.themes = this.themeService.allThemes;
    this.activeTheme = this.themeService.activeTheme;
  }

  changeTheme() {
    this.themeService.changeTheme(this.activeTheme);
  }
}
