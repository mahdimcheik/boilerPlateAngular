import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl<string>): { [key: string]: any } | null => {
    const forbidden = !control.value.endsWith('gmail.com');
    return forbidden ? { forbiddenEmail: { value: control.value } } : null;
  };
}
export function passwordStrengthValidator(): ValidatorFn {
  let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value.match(pattern)) {
      return { weakPassword: 'Mot de passe faible' };
    }
    return null;
  };
}

export function passwordValidator(
  password: string,
  passwordConfirmation: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // date are formated as 'yyyy-mm-dd'
    const value1 = control.get(password)?.value;
    const value2 = control.get(passwordConfirmation)?.value;
    let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!value1.match(pattern)) {
      return {
        weakPassword: 'Mot de passe faible',
      };
    }
    // check if date end is before date begin
    console.log('passwords : ', value1, value2);

    if (value1 !== value2)
      return {
        passwordDifference: 'Mots de passe differents',
      };
    return null;
  };
}
