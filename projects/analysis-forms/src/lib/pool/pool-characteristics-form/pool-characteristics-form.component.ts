import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	ControlContainer,
	FormControl,
	AbstractControl,
} from '@angular/forms';
import { CountryService, User, UserService } from 'configurator-core';
import { Checkbox } from '../../checkbox-group/checkbox-group.interface';
import { RadioButtonOption } from '../../radio-button-list/radio-button-option.interface';
import { placeOptions, poolTypes } from './pool-characteristics-constants';

@Component({
	selector: 'fcc-pool-characteristics-form',
	templateUrl: './pool-characteristics-form.component.html',
	styleUrls: ['./pool-characteristics-form.component.scss'],
})
export class PoolCharacteristicsFormComponent implements OnInit {
	poolCharacteristicsForm: FormGroup;

	placeOptions: RadioButtonOption[] = placeOptions;

	typeOptions: Checkbox[] = poolTypes;

	countryOptions;
	currentUser: User;

	coverQuestion: string;
	shelterQuestion: string;

	showRememberMessage: boolean = false;
	rememberMessageShown: boolean = false;
	showCoverMessage: boolean = true;

	get getShowRememberMessage(): boolean {
		const hasCover = !(
			this.poolCharacteristicsForm.get('hasCover').value === false
		);
		const shelter = !(
			this.poolCharacteristicsForm.get('shelter').value === false
		);
		if (!hasCover && !shelter) {
			this.rememberMessageShown = true;
		}
		return this.rememberMessageShown || (!hasCover && !shelter);
	}

	constructor(
		private poolCharacteristicsFormContainer: ControlContainer,
		private userService: UserService
	) {}

	ngOnInit() {
		this.poolCharacteristicsForm = this.poolCharacteristicsFormContainer
			.control as FormGroup;
		this.loadCountryOptions();
		this.loadCurrentUser();
	}

	getHasCoverError() {
		return (
			this.poolCharacteristicsForm.get('hasCover')?.touched &&
			this.poolCharacteristicsForm.get('hasCover').hasError('required')
		);
	}

	getShelterError() {
		return (
			this.poolCharacteristicsForm.get('shelter')?.touched &&
			this.poolCharacteristicsForm.get('shelter').hasError('required')
		);
	}

	needShowError(control: FormControl | AbstractControl, key?: string) {
		if (key && !control.hasError(key)) {
			return false;
		}

		return control.invalid && (control.touched || control.dirty);
	}

	private loadCurrentUser() {
		this.currentUser = this.userService.currentUser;
		if (!this.poolCharacteristicsForm?.get('countryCode').value) {
			this.poolCharacteristicsForm
				?.get('countryCode')
				.setValue(this.currentUser.countryCode);
		}
	}

	private loadCountryOptions() {
		this.countryOptions = CountryService.getCountries().map((country) => ({
			label: 'poolCharacteristics.countryOptions.' + country.code.toUpperCase(),
			key: country.code,
		}));
	}
}
