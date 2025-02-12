import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Password } from 'primeng/password';
import { finalize, max, tap } from 'rxjs';
import {
  ageValidator,
  passwordStrengthValidator,
  passwordValidator,
} from '../../../../shared/validators/confirmPasswordValidator';
import { AuthService } from '../../../../services/auth.service';
import {
  EnumGender,
  GenderDropDown,
  UserCreateDTO,
} from '../../../../shared/Models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  typesGenderList = [
    {
      id: '0',
      name: 'Homme',
      value: EnumGender.Homme,
    },
    {
      id: '1',
      name: 'Femme',
      value: EnumGender.Femme,
    },
    {
      id: '2',
      name: 'Non-binaire',
      value: EnumGender.NonBinaire,
    },
    {
      id: '3',
      name: 'Autre',
      value: EnumGender.Autre,
    },
  ];
  selectedGender: GenderDropDown = {
    id: '3',
    name: 'Autre',
    value: EnumGender.Autre,
  };

  userForm = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordStrengthValidator,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      dateOfBirth: [new Date(), [Validators.required, ageValidator]],
      gender: [this.selectedGender, [Validators.required]],
    },
    { validators: [passwordValidator('password', 'confirmPassword')] }
  );

  submit() {
    const newUser = {
      ...this.userForm.value,
      gender: this.userForm.value['gender']?.value,
    } as UserCreateDTO;
    console.log('new user ', newUser);

    this.authService
      .register(newUser)
      .pipe(
        tap((res) => {
          console.log('res', res);
          this.router.navigateByUrl('auth/account-created');
        })
      )
      .subscribe();
  }
}
