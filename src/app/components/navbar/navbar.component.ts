import { Component, computed, effect, inject, NgModule } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { FormsModule, NgModel } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    AvatarModule,
    BadgeModule,
    MenuModule,
    CommonModule,
    FormsModule,
    MenubarModule,
    ThemeSelectorComponent,
  ],
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  userConnected = this.authService.userConnected;
  items: MenuItem[] | undefined;
  userItems = computed(() => {
    if (this.userConnected().email) {
      return [
        {
          label: `${this.userConnected().firstName} ${
            this.userConnected().lastName
          }`,
          icon: 'pi pi-user',
        },
        {
          label: 'Déconnexion',
          icon: 'pi pi-star',
          command: () => this.authService.logout(),
        },
      ];
    } else {
      return [
        {
          label: 'Connexion',
          icon: 'pi pi-home',
          command: () => this.router.navigateByUrl('auth/login'),
        },
        {
          label: 'Inscription',
          icon: 'pi pi-star',
          command: () => this.router.navigateByUrl('auth/register'),
        },
      ];
    }
  }); //: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
          {
            separator: true,
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3',
              },
            ],
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: '3',
      },
    ];
  }
}
