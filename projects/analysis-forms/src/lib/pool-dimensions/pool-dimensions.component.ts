import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	FormGroupDirective,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ConfiguratorTranslateSharedModule, Shape } from 'configurator-core';
import { MessageModule } from '../message';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SurfaceAndVolumeCalculatorFactory } from './pool-shape/surface-and-volume-calculator-factory';
import { decimalsValue } from './pool-shape/decimal-value';

@Component({
	selector: 'fcc-pool-dimensions',
	templateUrl: './pool-dimensions.component.html',
	styleUrls: ['./pool-dimensions.component.scss'],
})
export class PoolDimensionsComponent {
	@Input() public shape: Shape;

	poolDimensionsControl: FormGroup;
	decimalValue: number = decimalsValue;

	constructor(private poolDimensionsFormContainer: FormGroupDirective) {
		this.poolDimensionsControl = this.poolDimensionsFormContainer.control.get(
			'dimension'
		) as FormGroup;
	}

	ngOnChanges(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				this.switchEnableDisableFields();
				resolve();
			}, 50);
		});
	}

	limitPressDecimals(event: Event) {
		const value = event.target['value'].replace(',', '.');
		if (value?.includes('.') && value.split('.')[1].length >= 2) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	limitInputDecimals(event: Event) {
		const value = event.target['value']?.replace(',', '.');
		if (value?.includes('.')) {
			const formattedValue =
				Math.round(value * this.decimalValue) / this.decimalValue;
			if (formattedValue && value !== formattedValue) {
				event.target['value'] = formattedValue.toString();
			}
		}
	}

	updateSurfaceAndVolume(shape: Shape) {
		const surfaceAndVolumeCalculator = new SurfaceAndVolumeCalculatorFactory(
			this.poolDimensionsControl,
			shape
		).create();

		this.poolDimensionsControl
			.get('surface')
			.setValue(surfaceAndVolumeCalculator.getSurface());
		this.poolDimensionsControl
			.get('volume')
			.setValue(surfaceAndVolumeCalculator.getVolume());
	}

	public hasError(
		control: FormControl | AbstractControl,
		key?: string
	): boolean {
		if (key && !control.hasError(key)) {
			return false;
		}
		return control.invalid && (control.touched || control.dirty);
	}

	private switchEnableDisableFields() {
		this.resetFields();
		if (this.shape === 'rectangular') {
			this.poolDimensionsControl.get('length').enable();
			this.poolDimensionsControl.get('width').enable();
			this.poolDimensionsControl.get('depth').enable();
		} else if (this.shape === 'round') {
			this.poolDimensionsControl.get('depth').enable();
			this.poolDimensionsControl.get('diameter').enable();
		} else if (this.shape === 'custom') {
			this.poolDimensionsControl.get('surface').enable();
			this.poolDimensionsControl.get('volume').enable();
		}
	}

	private resetFields() {
		this.poolDimensionsControl.disable();
		this.poolDimensionsControl.patchValue({
			length: null,
			width: null,
			depth: null,
			diameter: null,
			surface: null,
			volume: null,
		});
		this.poolDimensionsControl.markAsUntouched();
		this.poolDimensionsControl.markAsPristine();
	}
}

@NgModule({
	declarations: [PoolDimensionsComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MessageModule,
		ConfiguratorTranslateSharedModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
	],
	exports: [PoolDimensionsComponent],
})
export class PoolDimensionsModule {}
