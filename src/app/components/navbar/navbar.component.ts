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
  // items: MenuItem[] | undefined;
  userItems = computed(() => {
    if (this.userConnected().email) {
      return [
        {
          label: `${this.userConnected().firstName} ${
            this.userConnected().lastName
          }`,
          icon: 'pi pi-user',
          command: () => this.router.navigateByUrl('profile/me'),
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
  items = computed(() => {
    return this.userConnected().roles &&
      this.userConnected()?.roles.includes('Admin')
      ? [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => this.router.navigateByUrl(''),
          },
          {
            label: 'Profil',
            icon: 'pi pi-star',
            command: () => this.router.navigateByUrl(''),
          },

          {
            label: 'Dashboard',
            icon: 'pi pi-calendar',
            command: () => this.router.navigateByUrl('contactus'),
          },
          {
            label: 'A Propos',
            icon: 'pi pi-search',
            command: () => this.router.navigateByUrl('aboutus'),
          },
          {
            label: 'Contact',
            icon: 'pi pi-envelope',
            command: () => this.router.navigateByUrl('contactus'),
          },
        ]
      : [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => this.router.navigateByUrl(''),
          },
          {
            label: 'Profil',
            icon: 'pi pi-star',
            command: () => this.router.navigateByUrl(''),
          },
          {
            label: 'A Propos',
            icon: 'pi pi-search',
            command: () => this.router.navigateByUrl('aboutus'),
          },
          {
            label: 'Contact',
            icon: 'pi pi-envelope',
            command: () => this.router.navigateByUrl('contactus'),
          },
        ];
  });

  ngOnInit() {}
}
