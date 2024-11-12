import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LayoutClientComponent } from './pages/layout-client/layout-client.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TabMenuModule } from 'primeng/tabmenu';
import { OutletNavbarComponent } from './components/outlet-navbar/outlet-navbar.component';

@NgModule({
  declarations: [LayoutClientComponent, OutletNavbarComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    RatingModule,
    TabMenuModule,
  ],
})
export class ClientModule {}
