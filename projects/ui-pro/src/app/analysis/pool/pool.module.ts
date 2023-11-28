import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PoolRoutingModule } from './pool-routing.module';

import {
	PoolCharacteristicsFormModule,
	PoolGeolocationFormModule,
	PoolUsageFormModule,
	AnalysisManagerModule,
	FormContainerModule,
	MessageModule,
	NavigationButtonsModule,
	SpinnerModule,
	TitleModule,
	PoolProductsFormModule,
	PoolHeatingSolutionsFormModule,
} from 'analysis-forms';

import { PoolCharacteristicsComponent } from './pool-characteristics';
import { PoolProductsComponent } from './pool-products';

import { PoolGeolocationComponent } from './pool-geolocation';
import { PoolUsageComponent } from './pool-usage';
import { PoolHeatingSolutionsComponent } from './pool-heating-solutions';

@NgModule({
	declarations: [
		PoolCharacteristicsComponent,
		PoolGeolocationComponent,
		PoolUsageComponent,
		PoolProductsComponent,
		PoolHeatingSolutionsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),

		PoolRoutingModule,

		PoolCharacteristicsFormModule,
		PoolGeolocationFormModule,
		PoolProductsFormModule,
		PoolUsageFormModule,
		PoolHeatingSolutionsFormModule,

		AnalysisManagerModule,
		FormContainerModule,
		MessageModule,
		NavigationButtonsModule,
		SpinnerModule,
		TitleModule,
	],
})
export class PoolModule {}
