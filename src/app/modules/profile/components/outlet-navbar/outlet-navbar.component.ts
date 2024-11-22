import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SizeWatcherService } from '../../../../services/size-watcher.service';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  of,
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
  activeItem: MenuItem | undefined;
  windowWidth$ = inject(SizeWatcherService).windowWidth$;
  showLabel$!: Observable<boolean>;
  items: MenuItem[] = [
    {
      label: 'Infos',
      icon: 'pi pi-home',
      command: () => this.router.navigateByUrl('client'),
    },
    {
      label: 'Addresses',
      icon: 'pi pi-chart-line',
      command: () => this.router.navigateByUrl('client/adresses'),
    },
    { label: 'Products', icon: 'pi pi-list' },
    { label: 'Messages', icon: 'pi pi-inbox' },
  ];

  router = inject(Router);

  ngOnInit() {
    this.showLabel$ = this.windowWidth$.pipe(switchMap((x) => of(x > 990)));
  }
}
