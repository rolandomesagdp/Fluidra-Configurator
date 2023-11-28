import { FormGroup } from '@angular/forms';
import { SurfaceAndVolumeCalculator } from './surface-and-volume-calculator.interface';
import { RectangularShape } from './rectangular-shape';
import { RoundShape } from './round-shape';
import { Shape } from 'configurator-core';

export class SurfaceAndVolumeCalculatorFactory {
	constructor(private poolDimensionForm: FormGroup, private shape: Shape) {}

	create(): SurfaceAndVolumeCalculator {
		const lengthValue = this.poolDimensionForm.get('length').value;
		const widthValue = this.poolDimensionForm.get('width').value;
		const depthValue = this.poolDimensionForm.get('depth').value;
		const diameterValue = this.poolDimensionForm.get('diameter').value;

		switch (this.shape) {
			case 'rectangular':
				return new RectangularShape(lengthValue, widthValue, depthValue);
			case 'round':
				return new RoundShape(diameterValue, depthValue);
			default:
				throw new Error('The provided shape is not allowed');
		}
	}
}
