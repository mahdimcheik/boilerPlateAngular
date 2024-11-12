import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SizeWatcherService } from '../../../../services/size-watcher.service';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet-navbar',
  templateUrl: './outlet-navbar.component.html',
  styleUrl: './outlet-navbar.component.scss',
})
export class OutletNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  windowWidth$ = inject(SizeWatcherService).windowWidth$;
  showLabel$!: BehaviorSubject<boolean>;

  router = inject(Router);

  ngOnInit() {
    console.log('before subs');

    this.windowWidth$
      .pipe(
        map((x) => x > 990),
        distinctUntilChanged()
      )
      .subscribe((x) => {
        if (x) {
          this.items = [
            {
              label: 'Dashboard',
              icon: 'pi pi-home',
              command: () => this.router.navigateByUrl('client'),
            },
            {
              label: 'Transactions',
              icon: 'pi pi-chart-line',
              command: () => this.router.navigateByUrl('client/adresses'),
            },
            { label: 'Products', icon: 'pi pi-list' },
            { label: 'Messages', icon: 'pi pi-inbox' },
          ];
        } else {
          this.items = [
            {
              icon: 'pi pi-home',
              command: () => this.router.navigateByUrl('client'),
            },
            {
              icon: 'pi pi-chart-line',
              command: () => this.router.navigateByUrl('auth/adresses'),
            },
            { icon: 'pi pi-list' },
            { icon: 'pi pi-inbox' },
          ];
        }
      });
  }

  navigate(url: string) {
    console.log('url', url);

    this.router.navigateByUrl(this.activeItem?.url ?? '');
    console.log(url);
  }
}
