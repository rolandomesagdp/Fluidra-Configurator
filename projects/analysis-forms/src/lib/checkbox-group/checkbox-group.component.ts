import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import {
	AbstractValueAccessor,
	MakeValueAccessorProvider,
} from '../configurator-forms/control-accessor';
import { Checkbox } from './checkbox-group.interface';

@Component({
	selector: 'fcc-checkbox-group',
	templateUrl: './checkbox-group.component.html',
	styleUrls: ['./checkbox-group.component.scss'],
	providers: [MakeValueAccessorProvider(CheckboxGroupComponent)],
})
export class CheckboxGroupComponent extends AbstractValueAccessor<string[]> {
	@Input() options: Checkbox[];
	@Input() selectAll: boolean = false;
	@Input() selectAllLabel: string = 'checkbox.defaultSelectAll';

	selectAllValue: boolean = false;

	updateValue(option: string) {
		if (this.value?.indexOf(option) === -1) {
			this.value = [...this.value, option];
		} else {
			this.value = this.value.filter((value) => value !== option);
		}

		this.updateFullSelection();
	}

	selectDeselectAll() {
		if (this.selectAllValue) {
			this.value = this.options.map((option) => option.key);
		} else {
			this.value = [];
		}
	}

	isChecked(option: string) {
		return this.value?.includes(option);
	}

	private updateFullSelection() {
		if (this.value.length === 0) {
			this.selectAllValue = false;
		} else if (this.value.length === this.options.length) {
			this.selectAllValue = true;
		}
	}
}

@NgModule({
	declarations: [CheckboxGroupComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ConfiguratorTranslateSharedModule,
		MatInputModule,
		MatCheckboxModule,
	],
	exports: [CheckboxGroupComponent],
})
export class CheckboxGroupModule {}
