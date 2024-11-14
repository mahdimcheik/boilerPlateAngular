import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Password } from 'primeng/password';
import { max } from 'rxjs';
import {
  passwordStrengthValidator,
  passwordValidator,
} from '../../../../shared/validators/confirmPasswordValidator';
import { AuthService } from '../../../../services/auth.service';
import { UserCreateDTO } from '../../../../shared/Models/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);

  userForm = new FormGroup(
    {
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator,
      ]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      phoneNumber: new FormControl<string>(''),
    },
    { validators: [passwordValidator('password', 'confirmPassword')] }
  );

  submit() {
    console.log(this.userForm.errors);
    this.authService
      .register(this.userForm.value as UserCreateDTO)
      .pipe()
      .subscribe((res) => console.log('in page', res));
  }
}
