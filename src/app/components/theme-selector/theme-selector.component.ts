import { Component, OnInit, inject } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Theme, ThemeService } from '../../services/theme.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
  standalone: true,
  imports: [DropdownModule, FormsModule],
})
export class ThemeSelectorComponent implements OnInit {
  themes!: Theme[];
  private _themeService: ThemeService = inject(ThemeService);
  public get themeService(): ThemeService {
    return this._themeService;
  }
  public set themeService(value: ThemeService) {
    this._themeService = value;
  }

  localstorageService = inject(LocalstorageService);

  activeTheme!: Theme;

  ngOnInit(): void {
    // this.themes = this.themeService.allThemes;
    // const theme = this.localstorageService.getTheme();
    // if (theme?.id) {
    //   this.activeTheme = theme;
    //   this.themeService.activeTheme = theme;
    //   this.changeTheme();
    // }
    // this.activeTheme = this.themeService.activeTheme;
  }

  changeTheme() {
    this.themeService.changeTheme(this.activeTheme);
    this.localstorageService.setTheme(this.activeTheme);
  }
}
