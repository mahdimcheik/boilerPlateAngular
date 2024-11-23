import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './pages/layout-client/layout-client.component';
import { CalendarForReservationComponent } from './components/calendar-for-reservation/calendar-for-reservation.component';

const routes: Routes = [
  {
    path: 'bookings',
    component: CalendarForReservationComponent,
  },
  {
    path: ':id',
    component: LayoutClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
