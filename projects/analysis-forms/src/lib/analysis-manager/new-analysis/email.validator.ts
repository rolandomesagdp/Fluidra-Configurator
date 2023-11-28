import {
	FormControl,
	AbstractControl,
	ValidatorFn,
	ValidationErrors,
} from '@angular/forms';

export const EMAIL_RegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+([\w-]+)$/);

export const EmailValidator: ValidatorFn = (
	control: FormControl | AbstractControl
): ValidationErrors | null => {
	if (control.value && !EMAIL_RegExp.test(control.value)) {
		return { email: true };
	}
	return null;
};
