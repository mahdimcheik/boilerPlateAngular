import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientMainComponent } from './pages/client-main/client-main.component';
import { ListDishesComponent } from './pages/list-dishes/list-dishes.component';
import { ListDrinksComponent } from './pages/list-drinks/list-drinks.component';


@NgModule({
  declarations: [
    ClientMainComponent,
    ListDishesComponent,
    ListDrinksComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
