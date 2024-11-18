import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { SizeWatcherService } from '../../../../services/size-watcher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidenav-chacha',
  templateUrl: './sidenav-chacha.component.html',
  styleUrl: './sidenav-chacha.component.scss',
})
export class SidenavChachaComponent implements OnInit {
  isHovered: boolean = false;
  sidebarVisible: boolean = false;
  sizeChange = inject(SizeWatcherService).windowWidth$;
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.sizeChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((x) => (this.sidebarVisible = false));
  }

  menuItems = [
    { icon: 'pi pi-home', label: 'Home' },
    { icon: 'pi pi-user', label: 'Profile' },
    { icon: 'pi pi-sliders-v', label: 'Settings' },
    { icon: 'pi pi-sign-out', label: 'Logout' },
  ];

  toggleHover(state: boolean) {
    this.isHovered = state;
  }
  toggleMobileMenu() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
