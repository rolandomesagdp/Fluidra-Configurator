import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { RadioButtonOption } from '../radio-button-option.interface';
import {
	MakeValueAccessorProvider,
	AbstractValueAccessor,
} from '../../configurator-forms/control-accessor';

@Component({
	selector: 'fcc-shape-selector',
	templateUrl: './shape-selector.component.html',
	styleUrls: ['./shape-selector.component.scss'],
	providers: [MakeValueAccessorProvider(ShapeSelectorComponent)],
})
export class ShapeSelectorComponent extends AbstractValueAccessor<string> {
	options: RadioButtonOption[] = [
		{
			key: 'rectangular',
			label: 'poolCharacteristics.shapeOptions.rectangular',
		},
		{ key: 'round', label: 'poolCharacteristics.shapeOptions.round' },
		{ key: 'custom', label: 'poolCharacteristics.shapeOptions.custom' },
	];

	isSelected(option: string) {
		return this.value === option;
	}
}

@NgModule({
	declarations: [ShapeSelectorComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ConfiguratorTranslateSharedModule,
		MatInputModule,
	],
	exports: [ShapeSelectorComponent],
})
export class ShapeSelectorModule {}
