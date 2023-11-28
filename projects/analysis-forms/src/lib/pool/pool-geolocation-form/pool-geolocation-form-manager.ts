import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pool, PoolGeolocation } from 'configurator-core';
import { PoolFormManager } from '../pool-form-manager.interface';

export class PoolGeolocationFormManager implements PoolFormManager {
	// TODO: type form  to make sure to pool methods works without conflict?
	private _pool: Pool;

	public readonly formGroup: FormGroup = new FormGroup({
		altitude: new FormControl(50, [
			Validators.required,
			Validators.min(0),
			Validators.max(10000),
		]),
		wind: new FormControl('medium', Validators.required),
		climateZone: new FormControl(null, Validators.required),
	});

	get pool(): Pool {
		if (!this._pool) {
			this._pool = { name: 'new' };
		}
		this._pool.geolocation = this.formGroup?.getRawValue() as PoolGeolocation;
		return this._pool;
	}

	set pool(pool: Pool) {
		this._pool = pool;

		this.formGroup?.patchValue(this._pool?.geolocation);

		this.formGroup?.markAsPristine();
	}
}
