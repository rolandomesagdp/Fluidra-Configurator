import { SurfaceAndVolumeCalculator } from './surface-and-volume-calculator.interface';
import { decimalsValue } from './decimal-value';

export class RectangularShape implements SurfaceAndVolumeCalculator {
	private decimalValue: number = decimalsValue;

	constructor(
		public width: number,
		public length: number,
		public depth: number
	) {}

	getSurface(): number {
		if (this.length && this.width) {
			return Math.round(
				(this.length * this.width * this.decimalValue) / this.decimalValue
			);
		} else {
			return null;
		}
	}

	getVolume(): number {
		if (this.length && this.width && this.depth) {
			return Math.round(
				(this.length * this.width * this.depth * this.decimalValue) /
					this.decimalValue
			);
		} else {
			return null;
		}
	}
}
