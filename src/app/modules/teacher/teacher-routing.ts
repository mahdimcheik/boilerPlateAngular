import { LOCALE_ID, NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { LayoutTeacherComponent } from './pages/layout-teacher/layout-teacher.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarForReservationComponent } from '../profile/components/calendar-for-reservation/calendar-for-reservation.component';
import { UsersComponent } from './pages/users/users.component';
import { isAdminOnlyGuard } from '../../utilities/guards/is-admin-only.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutTeacherComponent,
    canActivate: [isAdminOnlyGuard],
    children: [
      {
        path: 'dashboard',
        component: CalendarComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
