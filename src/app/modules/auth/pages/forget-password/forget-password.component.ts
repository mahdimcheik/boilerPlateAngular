import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  passwordStrengthValidator,
  passwordValidator,
} from '../../../../shared/validators/confirmPasswordValidator';
import { AuthService } from '../../../../services/auth.service';
import { UserCreateDTO } from '../../../../shared/Models/user/user';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  authService = inject(AuthService);
  canChange = signal(false);
  message = signal('');

  userForm = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
  });

  submit() {
    console.log(this.userForm.errors);
    this.authService
      .forgotPassword(this.userForm.value as { email: string })
      .pipe(
        tap((res) => {
          if (res.status === 200) {
            this.canChange.set(true);
            this.message.set(res.message);
          }
        })
      )
      .subscribe((res) => console.log('in page', res));
  }
}
