import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordConfirmValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    return (password.value !== repeatPassword.value) ? { passwordConfirm: true } : null;
};
