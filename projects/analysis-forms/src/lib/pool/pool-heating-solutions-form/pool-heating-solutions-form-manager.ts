import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pool, PoolProductsAndBrands } from 'configurator-core';
import { PoolFormManager } from '../pool-form-manager.interface';

export class PoolHeatingSolutionsFormManager implements PoolFormManager {
	private _pool: Pool;

	public readonly formGroup: FormGroup = new FormGroup({
		heatPump: new FormControl(null, [Validators.required]),
		heatPumpInTechnicalRoom: new FormControl(null),
		heatingBrand: new FormControl(null, [Validators.required]),
	});

	get pool(): Pool {
		if (!this._pool) {
			this._pool = { name: '' };
		}
		if (!this._pool.productsAndBrands) {
			this._pool.productsAndBrands = {} as PoolProductsAndBrands;
		}
		let formRawValue = this.formGroup.getRawValue();
		this._pool.productsAndBrands.heatingBrand = formRawValue.heatingBrand;
		delete formRawValue.heatingBrand;
		this._pool.heatingSolutions = formRawValue;

		return this._pool;
	}

	set pool(pool: Pool) {
		this._pool = pool;

		this.formGroup?.controls['heatPump'].patchValue(
			this._pool?.heatingSolutions?.heatPump
		);
		this.formGroup?.controls['heatPumpInTechnicalRoom'].patchValue(
			this._pool?.heatingSolutions?.heatPumpInTechnicalRoom
		);
		this.formGroup?.controls['heatingBrand'].patchValue(
			this._pool?.productsAndBrands?.heatingBrand
		);

		this.formGroup?.markAsPristine();
	}
}
