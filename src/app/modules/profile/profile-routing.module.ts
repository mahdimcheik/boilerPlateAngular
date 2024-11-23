import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './pages/layout-client/layout-client.component';
import { CalendarForReservationComponent } from './components/calendar-for-reservation/calendar-for-reservation.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      {
        path: 'bookings',
        component: CalendarForReservationComponent,
      },
      {
        path: ':id',
        component: ProfilPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
