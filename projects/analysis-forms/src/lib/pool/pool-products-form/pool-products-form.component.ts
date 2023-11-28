import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
	ControlContainer,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { TitleModule } from '../../configurator-forms';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
	selector: 'fcc-pool-products-form',
	templateUrl: './pool-products-form.component.html',
	styleUrls: ['./pool-products-form.component.scss'],
})
export class PoolProductsFormComponent {
	poolProductsForm: FormGroup;

	constructor(private poolProductsFormContainer: ControlContainer) {}

	ngOnInit() {
		this.poolProductsForm = this.poolProductsFormContainer.control as FormGroup;
	}
}

@NgModule({
	declarations: [PoolProductsFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		ConfiguratorTranslateSharedModule,
		ReactiveFormsModule,
		TitleModule,
		MatCheckboxModule,
	],
	exports: [PoolProductsFormComponent],
})
export class PoolProductsFormModule {}
