import { Component } from '@angular/core';
export type NavbarLink = {
  id: number;
  icon: string;
  label: string;
  url: string;
};
@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.scss',
})
export class CustomNavbarComponent {
  sidebarVisible: boolean = false;
  showLabel: boolean = false;
  links: NavbarLink[] = [
    {
      id: 1,
      icon: 'pi pi-user-edit',
      label: 'Utilsateur',
      url: '',
    },
    {
      id: 2,
      icon: 'pi pi-calendar-clock',
      label: 'Calendrier',
      url: '',
    },
    {
      id: 3,
      icon: 'pi pi-user-edit',
      label: 'Résérvations',
      url: '',
    },
    {
      id: 4,
      icon: 'pi pi-user-edit',
      label: 'Mails',
      url: '',
    },
  ];

  hideNavbar() {
    this.sidebarVisible = false;
    console.log(this.sidebarVisible);
  }
  toggle() {
    this.showLabel = !this.showLabel;
  }
}
