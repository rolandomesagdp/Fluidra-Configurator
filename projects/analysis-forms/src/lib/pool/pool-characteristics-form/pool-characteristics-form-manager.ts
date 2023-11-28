import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Pool, PoolGeolocation } from 'configurator-core';
import { PoolFormManager } from '../pool-form-manager.interface';

export class PoolCharacteristicsFormManager implements PoolFormManager {
	private _pool: Pool;

	public readonly formGroup: FormGroup = new FormGroup({
		place: new FormControl(null, [Validators.required]),
		ground: new FormControl(null, [Validators.required]),
		hasCover: new FormControl(null, [Validators.required]),
		shelter: new FormControl(null, [Validators.required]),
		shape: new FormControl(null, [Validators.required]),
		type: new FormControl(null, [Validators.required]),
		heated: new FormControl(null),
		dimension: new FormGroup({
			length: new FormControl(null, [Validators.required]),
			width: new FormControl(null, [Validators.required]),
			depth: new FormControl(null, [Validators.required]),
			diameter: new FormControl(null, [Validators.required]),
			surface: new FormControl(null, [Validators.required]),
			volume: new FormControl(null, [Validators.required]),
		}),
		countryCode: new FormControl(null, [Validators.required]),
		zipCode: new FormControl(null, [Validators.required]),
	});

	get pool(): Pool {
		if (!this._pool) {
			this._pool = { name: '' };
		}
		if (!this._pool.geolocation) {
			this._pool.geolocation = {} as PoolGeolocation;
		}
		let formValue = this.formGroup.value;
		this._pool.geolocation.countryCode = formValue.countryCode;
		this._pool.geolocation.zipCode = formValue.zipCode;
		delete formValue.countryCode;
		delete formValue.zipCode;

		this._pool.characteristics = formValue;
		this._pool.characteristics.type =
			this._pool.characteristics.type.length > 1
				? 'swimming_pool_and_spa'
				: this._pool.characteristics.type[0];
		this._pool.characteristics.ground = this._pool.characteristics.ground
			? 'inGround'
			: 'aboveGround';

		return this._pool;
	}

	set pool(pool: Pool) {
		this._pool = pool;

		this.formGroup?.controls['place'].patchValue(
			this._pool?.characteristics?.place
		);
		this.formGroup?.controls['ground'].patchValue(
			this._pool?.characteristics?.ground === 'aboveGround' ? false : true
		);
		this.formGroup?.controls['hasCover'].patchValue(
			this._pool?.characteristics?.hasCover
		);
		this.formGroup?.controls['shelter'].patchValue(
			this._pool?.characteristics?.shelter
		);
		this.formGroup?.controls['shape'].patchValue(
			this._pool?.characteristics?.shape
		);
		this.formGroup?.controls['type'].patchValue(
			this._pool.characteristics?.type
				? this._pool.characteristics?.type === 'swimming_pool_and_spa'
					? ['swimming_pool', 'spa']
					: [this._pool.characteristics?.type] || null
				: []
		);
		this.formGroup?.controls['heated'].patchValue(
			this._pool?.characteristics?.heated
		);
		this.formGroup?.controls['dimension'].patchValue(
			this._pool?.characteristics?.dimension
		);
		if (this._pool?.geolocation?.countryCode) {
			this.formGroup?.controls['countryCode'].patchValue(
				this._pool?.geolocation?.countryCode
			);
		}
		this.formGroup?.controls['zipCode'].patchValue(
			this._pool?.geolocation?.zipCode
		);

		this.formGroup?.markAsPristine();
	}
}
