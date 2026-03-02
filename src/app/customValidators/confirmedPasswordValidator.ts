import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmedPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (!password || !confirmPassword) {
      return null;
    }

    let errVal = { unMatchedPassword: true };
    return password === confirmPassword ? null : errVal;
  };
}
