import { SurfaceAndVolumeCalculator } from './surface-and-volume-calculator.interface';
import { decimalsValue } from './decimal-value';

export class RoundShape implements SurfaceAndVolumeCalculator {
	private decimalValue: number = decimalsValue;

	constructor(public diameter: number, public depth: number) {}

	getSurface(): number {
		if (this.diameter) {
			return (
				Math.round(
					Math.PI * Math.pow(this.diameter / 2, 2) * this.decimalValue
				) / this.decimalValue
			);
		} else {
			return null;
		}
	}

	getVolume(): number {
		if (this.diameter && this.depth) {
			return (
				Math.round(
					Math.PI *
						Math.pow(this.diameter / 2, 2) *
						this.depth *
						this.decimalValue
				) / this.decimalValue
			);
		} else {
			return null;
		}
	}
}
