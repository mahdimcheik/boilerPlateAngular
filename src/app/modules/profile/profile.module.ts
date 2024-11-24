import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { LayoutClientComponent } from './pages/layout-client/layout-client.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TabMenuModule } from 'primeng/tabmenu';
import { OutletNavbarComponent } from './components/outlet-navbar/outlet-navbar.component';
import { PersonnalInfosComponent } from './pages/personnal-infos/personnal-infos.component';
import { FieldsetModule } from 'primeng/fieldset';
import { LineBinaryDataComponent } from '../../shared/components/line-binary-data/line-binary-data.component';
import { AdressesComponent } from './pages/adresses/adresses.component';
import { FormationComponent } from './components/formation/formation.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NotificationComponent } from './components/notification/notification.component';
import { DobToAgePipe } from '../../utilities/pipes/dob-to-age.pipe';
import { GenderTransformPipe } from '../../utilities/pipes/gender-transform.pipe';
import { AddresseComponent } from './components/addresse/addresse.component';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ModalEditAdresseComponent } from './components/modal-edit-adresse/modal-edit-adresse.component';
import { ModalValidateComponent } from '../../shared/components/modal-validate/modal-validate.component';
import { ModalEditFormationComponent } from './components/modal-edit-formation/modal-edit-formation.component';
import { ModalEditPersonnalInfosComponent } from './components/modal-edit-personnal-infos/modal-edit-personnal-infos.component';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ImageModule } from 'primeng/image';
import { ProfileRoutingModule } from './profile-routing.module';
import { ModalBookDeleteAppointmentComponent } from './components/modal-book-delete-appointment/modal-book-delete-appointment';
import { DialogModule } from 'primeng/dialog';
import { CalendarForReservationComponent } from './components/calendar-for-reservation/calendar-for-reservation.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    LayoutClientComponent,
    OutletNavbarComponent,
    PersonnalInfosComponent,
    AdressesComponent,
    FormationComponent,
    NotificationComponent,
    DobToAgePipe,
    GenderTransformPipe,
    AddresseComponent,
    ModalEditAdresseComponent,
    ModalEditFormationComponent,
    ModalEditPersonnalInfosComponent,
    FileUploadComponent,
    ModalBookDeleteAppointmentComponent,
    CalendarForReservationComponent,
    BookPageComponent,
    ProfilPageComponent,
    BookingPageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    RatingModule,
    TabMenuModule,
    FieldsetModule,
    LineBinaryDataComponent,
    SidebarModule,
    ButtonModule,
    DividerModule,
    ReactiveFormsModule,
    DropdownModule,
    ModalValidateComponent,
    CalendarModule,
    FileUploadModule,
    ButtonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    MenuModule,
    NavbarComponent,
    ImageModule,
    DialogModule,
    FullCalendarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
})
export class ProfileModule {}
