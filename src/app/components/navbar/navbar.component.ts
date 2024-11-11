import { Component, computed, effect, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
          command: () => this.router.navigateByUrl('auth'),
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
