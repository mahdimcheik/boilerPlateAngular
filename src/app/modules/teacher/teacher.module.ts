import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutTeacherComponent } from './pages/layout-teacher/layout-teacher.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TeacherRoutingModule } from './teacher-routing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { ModalCreateAppoitmentComponent } from './components/modal-create-appoitment/modal-create-appoitment.component';
import { DialogModule } from 'primeng/dialog';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { SidenavChachaComponent } from './components/sidenav-chacha/sidenav-chacha.component';

@NgModule({
  declarations: [
    LayoutTeacherComponent,
    ProfilComponent,
    CalendarComponent,
    ModalCreateAppoitmentComponent,
    CustomNavbarComponent,
    SidenavChachaComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FullCalendarModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
  ],
})
export class TeacherModule {}
