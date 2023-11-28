import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pool } from 'configurator-core';
import { PoolFormManager } from '../pool-form-manager.interface';

export class PoolProductsFormManager implements PoolFormManager {
	private _pool: Pool;

	public readonly formGroup: FormGroup = new FormGroup({
		heating: new FormControl(null),
	});

	get pool(): Pool {
		if (!this._pool) {
			this._pool = { name: '' };
		}
		this._pool.productsAndBrands = this.formGroup?.getRawValue();

		return this._pool;
	}

	set pool(pool: Pool) {
		this._pool = pool;

		this.formGroup?.patchValue(this._pool?.productsAndBrands);

		this.formGroup?.markAsPristine();
	}
}
