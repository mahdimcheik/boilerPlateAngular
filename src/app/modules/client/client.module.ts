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

@NgModule({
  declarations: [
    LayoutClientComponent,
    OutletNavbarComponent,
    PersonnalInfosComponent,
    AdressesComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    RatingModule,
    TabMenuModule,
    FieldsetModule,
    LineBinaryDataComponent,
  ],
})
export class ClientModule {}
