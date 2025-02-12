import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LayoutTeacherComponent } from './pages/layout-teacher/layout-teacher.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { TeacherRoutingModule } from './teacher-routing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { ModalCreateAppoitmentComponent } from './components/modal-create-appoitment/modal-create-appoitment.component';
import { DialogModule } from 'primeng/dialog';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { SidenavChachaComponent } from './components/sidenav-chacha/sidenav-chacha.component';
import localeFr from '@angular/common/locales/fr';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ModalUpdateAppointmentComponent } from './components/modal-update-appointment/modal-update-appointment.component';
import { ModalDeleteAppointmentComponent } from './components/modal-delete-appointment/modal-delete-appointment.component';
import { UsersComponent } from './pages/users/users.component';
import { UserLiComponent } from './components/user-li/user-li.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarStudentComponent } from './pages/calendar-student/calendar-student.component';
import { ModalReserverAnnulerByStudentComponent } from './components/modal-reserver-annuler-by-student/modal-reserver-annuler-by-student.component';
import { HelpTypePipe } from '../../utilities/pipes/help-type.pipe';
import { FieldsetModule } from 'primeng/fieldset';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    LayoutTeacherComponent,
    ProfilComponent,
    CalendarComponent,
    ModalCreateAppoitmentComponent,
    CustomNavbarComponent,
    SidenavChachaComponent,
    ModalUpdateAppointmentComponent,
    ModalDeleteAppointmentComponent,
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
})
export class TeacherModule {}
