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

@NgModule({
  declarations: [
    LayoutTeacherComponent,
    ProfilComponent,
    CalendarComponent,
    ModalCreateAppoitmentComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FullCalendarModule,
    ButtonModule,
    DialogModule,
  ],
})
export class TeacherModule {}
