import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { MatInputModule } from '@angular/material/input';
import {
	AbstractValueAccessor,
	MakeValueAccessorProvider,
} from '../../configurator-forms/control-accessor';
import { RadioButtonOption } from '../radio-button-option.interface';

@Component({
	selector: 'fcc-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
	providers: [MakeValueAccessorProvider(RadioButtonComponent)],
})
export class RadioButtonComponent extends AbstractValueAccessor {
	@Input() options: RadioButtonOption[];
}

@NgModule({
	declarations: [RadioButtonComponent],
	imports: [
		MatRadioModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ConfiguratorTranslateSharedModule,
		MatInputModule,
	],
	exports: [RadioButtonComponent],
})
export class RadioButtonModule {}
