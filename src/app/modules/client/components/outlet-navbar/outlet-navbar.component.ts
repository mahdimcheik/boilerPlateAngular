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

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Transactions', icon: 'pi pi-chart-line' },
      { label: 'Products', icon: 'pi pi-list' },
      { label: 'Messages', icon: 'pi pi-inbox' },
    ];
    console.log('before subs');

    this.windowWidth$
      .pipe(
        map((x) => x > 990),
        distinctUntilChanged()
      )
      .subscribe((x) => {
        if (x) {
          this.items = [
            { label: 'Dashboard', icon: 'pi pi-home' },
            { label: 'Transactions', icon: 'pi pi-chart-line' },
            { label: 'Products', icon: 'pi pi-list' },
            { label: 'Messages', icon: 'pi pi-inbox' },
          ];
        } else {
          this.items = [
            { icon: 'pi pi-home' },
            { icon: 'pi pi-chart-line' },
            { icon: 'pi pi-list' },
            { icon: 'pi pi-inbox' },
          ];
        }
      });
  }
}
