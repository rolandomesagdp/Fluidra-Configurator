import {
	FormControl,
	AbstractControl,
	ValidatorFn,
	ValidationErrors,
} from '@angular/forms';

export const PHONE_RegExp = new RegExp(/^\d*$/);

export const PhoneValidator: ValidatorFn = (
	control: FormControl | AbstractControl
): ValidationErrors | null => {
	if (control.value && !PHONE_RegExp.test(control.value)) {
		return { phone: true };
	}
	return null;
};
