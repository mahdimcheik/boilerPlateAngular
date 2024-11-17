import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutTeacherComponent } from './pages/layout-teacher/layout-teacher.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TeacherRoutingModule } from './teacher-routing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LayoutTeacherComponent, ProfilComponent, CalendarComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FullCalendarModule,
    ButtonModule,
  ],
})
export class TeacherModule {}
