import { YesNoQuestionModule } from '../../radio-button-list/yes-no-question';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import {
	AbstractControl,
	ControlContainer,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { TitleModule } from '../../configurator-forms';
import {
	ConfiguratorTranslateSharedModule,
	Product,
	ProductType,
} from 'configurator-core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'fcc-pool-heating-solutions-form',
	templateUrl: './pool-heating-solutions-form.component.html',
	styleUrls: ['./pool-heating-solutions-form.component.scss'],
})
export class PoolHeatingSolutionsFormComponent {
	poolHeatingSolutionsForm: FormGroup;
	@Input({ required: true }) productList: Product[];
	component: AbstractControl<
		{ heatPump: boolean; heatingBrand: any },
		{ heatPump: boolean; heatingBrand: any }
	>;

	get brands() {
		return this.productList
			?.filter((product) => this.filterProductType(product))
			?.map((product) => product.brand)
			?.filter((value, index, self) => self.indexOf(value) === index);
	}
	constructor(private poolHeatingSolutionsFormContainer: ControlContainer) {}

	ngOnInit() {
		this.poolHeatingSolutionsForm = this.poolHeatingSolutionsFormContainer
			.control as FormGroup;
	}

	needShowError(control: FormControl | AbstractControl, key?: string) {
		if (key && !control.hasError(key)) {
			return false;
		}

		return control.invalid && (control.touched || control.dirty);
	}

	private filterProductType(product: Product) {
		const checkedProductTypes: ProductType[] = [];
		if (this.poolHeatingSolutionsForm?.get('heatPump').value) {
			checkedProductTypes.push('heatPump');
		}

		return (
			!checkedProductTypes.length || checkedProductTypes.includes(product.type)
		);
	}
}

@NgModule({
	declarations: [PoolHeatingSolutionsFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		ConfiguratorTranslateSharedModule,
		ReactiveFormsModule,
		TitleModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		YesNoQuestionModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule,
	],
	exports: [PoolHeatingSolutionsFormComponent],
})
export class PoolHeatingSolutionsFormModule {}
