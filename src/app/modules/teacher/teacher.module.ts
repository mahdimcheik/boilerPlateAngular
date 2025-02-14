import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LayoutTeacherComponent } from './pages/layout-teacher/layout-teacher.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { TeacherRoutingModule } from './teacher-routing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { SidenavChachaComponent } from './components/sidenav-chacha/sidenav-chacha.component';
import localeFr from '@angular/common/locales/fr';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { UserLiComponent } from './components/user-li/user-li.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarStudentComponent } from './pages/calendar-student/calendar-student.component';
import { ModalReserverAnnulerByStudentComponent } from './components/modal-reserver-annuler-by-student/modal-reserver-annuler-by-student.component';
import { HelpTypePipe } from '../../utilities/pipes/help-type.pipe';
import { FieldsetModule } from 'primeng/fieldset';
import { EditorModule } from 'primeng/editor';
import { ModalDetailsStudentAppointmentComponent } from './components/modal-details-student-appointment/modal-details-student-appointment.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    LayoutTeacherComponent,
    ProfilComponent,
    CalendarComponent,
    CustomNavbarComponent,
    SidenavChachaComponent,
    ModalDetailsStudentAppointmentComponent,
    UsersComponent,
    UserLiComponent,
    CalendarStudentComponent,
    ModalReserverAnnulerByStudentComponent,
    HelpTypePipe,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FullCalendarModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    FieldsetModule,
    EditorModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
})
export class TeacherModule {}
