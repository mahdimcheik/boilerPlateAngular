import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule
  ]
})
export class AuthModule { }
