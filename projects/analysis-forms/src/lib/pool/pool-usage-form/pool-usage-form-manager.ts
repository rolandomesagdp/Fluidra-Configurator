import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	FiltrationType,
	Months,
	Pool,
	PoolPrivacy,
	PoolUsage,
	PowerSupplyType,
} from 'configurator-core';
import { map, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

export class PoolUsageFormManager {
	private _pool: Pool;

	public readonly formGroup: FormGroup = new FormGroup({
		periodOfUseMonths: new FormControl<Months[]>(
			[Months.May, Months.June, Months.July, Months.August, Months.September],
			[Validators.required]
		),
		currentWaterTemperature: new FormControl<number>(15, [
			Validators.required,
			Validators.min(0),
			Validators.max(28),
		]),
		targetWaterTemperature: new FormControl<number>(26, [
			Validators.required,
			Validators.min(20),
			Validators.max(43),
		]),

		filtrationTime: new FormControl<number>(13, [
			Validators.required,
			Validators.min(0),
			Validators.max(24),
		]),

		powerSupplyType: new FormControl<PowerSupplyType>(
			PowerSupplyType.BothPhases,
			Validators.required
		),

		attendance: new FormControl<PoolPrivacy>(
			PoolPrivacy.PRIVATE,
			Validators.required
		),
		filtrationType: new FormControl<FiltrationType>(
			FiltrationType.SKIMMER,
			Validators.required
		),
	});

	private readonly collectiveAttendanceFormGroup = new FormGroup({
		spa: new FormControl(null, Validators.required),
		river: new FormControl(null, Validators.required),
		waves: new FormControl(null, Validators.required),
		slides: new FormControl(null, Validators.required),
	});

	get pool(): Pool {
		if (!this._pool) {
			this._pool = { name: 'new' };
		}
		this._pool.usage = this.formGroup?.getRawValue() as PoolUsage;

		return this._pool;
	}

	set pool(pool: Pool) {
		this._pool = pool;

		this.formGroup?.patchValue(this._pool?.usage);

		this.formGroup?.markAsPristine();
	}

	public watchFormChanges(): Observable<void> {
		return merge(this.checkCollectiveAttendance()).pipe(map(() => undefined));
	}

	private checkCollectiveAttendance() {
		return this.formGroup?.controls?.['attendance']?.valueChanges?.pipe(
			tap((attendance) => {
				if (attendance === PoolPrivacy.PRIVATE) {
					this.removeCollectiveAttendanceFormGroup();
				} else {
					this.addCollectiveAttendanceFormGroup();
				}
			})
		);
	}

	private removeCollectiveAttendanceFormGroup() {
		if (this.isCollectiveAttendanceOnFormGroup()) {
			this.formGroup.removeControl('collectiveAttendance');
			this.collectiveAttendanceFormGroup.reset();
		}
	}

	private addCollectiveAttendanceFormGroup() {
		if (!this.isCollectiveAttendanceOnFormGroup()) {
			this.formGroup.addControl(
				'collectiveAttendance',
				this.collectiveAttendanceFormGroup
			);
		}
	}

	private isCollectiveAttendanceOnFormGroup() {
		return !!this.formGroup?.controls?.['collectiveAttendance'];
	}

	public getCountryCode() {
		return this._pool?.geolocation?.countryCode || this._pool?.countryCode;
	}
}
