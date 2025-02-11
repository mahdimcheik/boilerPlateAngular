import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import {
  canNotLoginGuard,
  canNotRegisterGuard,
} from '../../utilities/guards/can-login.guard';
import { LayoutAuthComponent } from './pages/layout-auth/layout-auth.component';
import { AccountCreatedSuccesfulyComponent } from './pages/account-created-succesfuly/account-created-succesfuly.component';
import { EmailConfirmationSuccessComponent } from './pages/email-confirmation-success/email-confirmation-success.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    canActivate: [canNotLoginGuard],
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgetPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'account-created',
        component: AccountCreatedSuccesfulyComponent,
      },
      {
        path: 'email-confirmation-success',
        component: EmailConfirmationSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
