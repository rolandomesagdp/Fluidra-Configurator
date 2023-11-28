import { Component, Input } from '@angular/core';
import {
	AbstractValueAccessor,
	MakeValueAccessorProvider,
} from '../configurator-forms/control-accessor';

@Component({
	selector: 'fcc-temperature-input',
	templateUrl: './temperature-input.component.html',
	styleUrls: ['./temperature-input.component.scss'],

	providers: [MakeValueAccessorProvider(TemperatureInputComponent)],
})
export class TemperatureInputComponent extends AbstractValueAccessor {
	@Input()
	public step?: number = 1;

	@Input()
	public min?: number;
	@Input()
	public max?: number;

	public canSetMoreValue(): boolean {
		return (
			this.value === undefined ||
			this.max === undefined ||
			this.value < this.max
		);
	}
	public setMoreValue(): void {
		if (this.canSetMoreValue()) {
			this.value = this.value + this.step;
		}
	}

	public canSetLessValue(): boolean {
		return (
			this.value === undefined ||
			this.min === undefined ||
			this.value > this.min
		);
	}

	public setLessValue(): void {
		if (this.canSetLessValue()) {
			this.value = this.value - this.step;
		}
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
		super.onInput($event);
	}
}
