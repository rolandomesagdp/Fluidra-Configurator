import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationButtonsModule } from './navigation-buttons';
import { MessageModule } from './message';
import { SpinnerModule } from './spinner';
import { CheckboxGroupModule } from './checkbox-group';
import {
	PoolCharacteristicsFormModule,
	PoolGeolocationFormModule,
	PoolProductsFormModule,
	PoolHeatingSolutionsFormModule,
} from './pool';
import { RadioButtonListModule } from './radio-button-list';
import { ConfiguratorFormsModule } from './configurator-forms';
import { TemperatureInputModule } from './temperature-input';

@NgModule({
	imports: [
		CommonModule,
		PoolCharacteristicsFormModule,
		PoolProductsFormModule,
		PoolGeolocationFormModule,
		PoolHeatingSolutionsFormModule,
		NavigationButtonsModule,
		MessageModule,
		SpinnerModule,
		CheckboxGroupModule,
		RadioButtonListModule,
		ConfiguratorFormsModule,
		TemperatureInputModule,
	],
	exports: [
		SpinnerModule,
		PoolCharacteristicsFormModule,
		PoolProductsFormModule,
		PoolGeolocationFormModule,
		PoolHeatingSolutionsFormModule,
		NavigationButtonsModule,
		MessageModule,
		CheckboxGroupModule,
		RadioButtonListModule,
		ConfiguratorFormsModule,
		TemperatureInputModule,
	],
})
export class AnalysisFormsModule {}
