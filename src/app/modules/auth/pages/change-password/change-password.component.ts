import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  passwordStrengthValidator,
  passwordValidator,
} from '../../../../shared/validators/confirmPasswordValidator';
import {
  UserChangePasswordDTO,
  UserCreateDTO,
} from '../../../../shared/Models/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  visible: boolean = false;
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  userForm = new FormGroup(
    {
      userId: new FormControl<string>(''),
      resetToken: new FormControl<string>(''),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator,
      ]),
      passwordConfirmation: new FormControl<string>('', [Validators.required]),
    },
    { validators: [passwordValidator('password', 'passwordConfirmation')] }
  );

  ngOnInit(): void {
    console.log('data router ', this.activatedRoute.snapshot);

    let userId = this.activatedRoute.snapshot.queryParams['userId'];
    let resetToken = this.activatedRoute.snapshot.queryParams['resetToken'];
    this.userForm.setValue({
      userId: userId,
      resetToken: resetToken,
      password: '',
      passwordConfirmation: '',
    });
  }

  submit() {
    console.log(this.userForm.errors);
    this.authService
      .resetPassword(this.userForm.value as UserChangePasswordDTO)
      .pipe(
        delay(1000),
        tap((res) => {
          this.router.navigateByUrl('/');
        })
      )
      .subscribe((res) => console.log('in page', res));
  }
  showDialog() {
    this.visible = true;
  }
}
