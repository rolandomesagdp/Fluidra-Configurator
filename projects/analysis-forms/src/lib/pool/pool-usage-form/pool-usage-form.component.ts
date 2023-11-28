import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
	FormGroup,
	ControlContainer,
	AbstractControl,
	FormControl,
} from '@angular/forms';

import {
	Months,
	PowerSupplyType,
	PoolPrivacy,
	SubscriptionsManager,
	FiltrationType,
	UserService,
	TariffService,
} from 'configurator-core';
import { RadioButtonOption } from '../../radio-button-list/radio-button-option.interface';
import { tap, takeUntil, switchMap, map, startWith } from 'rxjs/operators';

@Component({
	selector: 'fcc-pool-usage-form',
	templateUrl: './pool-usage-form.component.html',
	styleUrls: ['./pool-usage-form.component.scss'],
})
export class PoolUsageFormComponent implements OnInit, OnDestroy {
	@Input({ required: true }) countryCode: string;

	public poolUsageForm: FormGroup;

	public periodOptions: RadioButtonOption[];

	public powerSupplyOptions: PowerSupplyType[] = Object.values(PowerSupplyType);
	public attendanceOptions: PoolPrivacy[] = Object.values(PoolPrivacy);
	public filtrationTypeOptions: FiltrationType[] =
		Object.values(FiltrationType);

	public averageTariff: number;

	constructor(
		private poolUsageFormContainer: ControlContainer,
		private translateService: TranslateService,
		private subscriptionsManager: SubscriptionsManager,
		private userService: UserService,
		private tariffService: TariffService
	) {}

	ngOnInit() {
		this.poolUsageForm = this.poolUsageFormContainer.control as FormGroup;
		this.loadPeriodOptions();
		this.calculateFiltrationTimeWhenChangeTargetWaterTemperature();
		this.calculateAverageTariff();
	}

	ngOnDestroy(): void {
		this.subscriptionsManager.unsubscribe();
	}

	private loadPeriodOptions() {
		this.periodOptions = Object.values(Months).map((option) => ({
			key: option,
			label: this.translateService.instant(
				`poolUsage.period.options.${option}`
			),
		}));
	}

	needShowError(control: FormControl | AbstractControl, key?: string) {
		if (key && !control.hasError(key)) {
			return false;
		}

		return control.invalid && (control.touched || control.dirty);
	}

	public showCalculateInfo() {
		console.log('showCalculateInfo');
	}

	public preventPressDecimals($event: KeyboardEvent) {
		if (!new RegExp(/^\d*$/).test($event.key)) {
			$event.preventDefault();
			$event.stopPropagation();
		}
	}

	public preventSetDecimals($event: InputEvent | Event) {
		const value: string = $event.target['value']?.replace(',', '.');
		$event.target['value'] = value.split('.')[0];
	}

	private calculateFiltrationTimeWhenChangeTargetWaterTemperature() {
		this.poolUsageForm?.controls?.['targetWaterTemperature']?.valueChanges
			?.pipe(
				takeUntil(this.subscriptionsManager.destroy$),
				tap((targetWaterTemperature) =>
					this.poolUsageForm?.controls?.['filtrationTime']?.patchValue(
						this.calculateFiltrationTime(targetWaterTemperature)
					)
				)
			)
			?.subscribe();
	}

	private calculateFiltrationTime(targetWaterTemperature: number): number {
		if (targetWaterTemperature) {
			if (targetWaterTemperature >= 30) {
				return 24;
			} else {
				return Math.ceil(targetWaterTemperature / 2);
			}
		} else {
			return null;
		}
	}

	public canShowAverageTariff() {
		return this.userService.currentUser?.isAdmin;
	}

	private calculateAverageTariff() {
		if (this.canShowAverageTariff()) {
			this.poolUsageForm.controls?.['filtrationTime']?.valueChanges
				.pipe(
					startWith(this.poolUsageForm.controls?.['filtrationTime']?.value),
					takeUntil(this.subscriptionsManager.destroy$),
					switchMap((value: number) =>
						this.tariffService.getAnnualAverageTariff(value, this.countryCode)
					),
					map((res) => res),
					tap((value) => {
						this.averageTariff = value;
					})
				)
				.subscribe();
		}
	}
}
