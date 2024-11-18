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
import { provideRouter } from '@angular/router';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

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
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
})
export class TeacherModule {}
