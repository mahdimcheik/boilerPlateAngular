import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
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
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';

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
    NavbarComponent,
    ThemeSelectorComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
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
  ],
})
export class ClientModule {}
