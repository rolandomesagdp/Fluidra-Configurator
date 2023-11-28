import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisComponent } from './analysis.component';
import { LayoutModule } from '../layout';
import {
	AnalysisManagerModule,
	FormContainerModule,
	MessageModule,
	NavigationButtonsModule,
	SpinnerModule,
	TitleModule,
} from 'analysis-forms';
import { AllAnalysisComponent } from './all-analysis/all-analysis.component';
import { SubscriptionsManager } from 'configurator-core';

@NgModule({
	declarations: [DashboardComponent, AnalysisComponent, AllAnalysisComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AnalysisRoutingModule,
		AnalysisManagerModule,
		NavigationButtonsModule,
		LayoutModule,
		MessageModule,
		SpinnerModule,
		TranslateModule.forChild(),
		FormContainerModule,
		TitleModule,
	],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
		{
			provide: SubscriptionsManager,
			useValue: new SubscriptionsManager(),
		},
	],
})
export default class AnalysisModule {}
