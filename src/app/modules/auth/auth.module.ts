import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ModalComponent } from './components/modal/modal.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutAuthComponent } from './pages/layout-auth/layout-auth.component';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AccountCreatedSuccesfulyComponent } from './pages/account-created-succesfuly/account-created-succesfuly.component';
import { EmailConfirmationSuccessComponent } from './pages/email-confirmation-success/email-confirmation-success.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    ModalComponent,
    LayoutAuthComponent,
    AccountCreatedSuccesfulyComponent,
    EmailConfirmationSuccessComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule,
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    BadgeModule,
    CalendarModule,
    DropdownModule,
  ],
})
export class AuthModule {}
