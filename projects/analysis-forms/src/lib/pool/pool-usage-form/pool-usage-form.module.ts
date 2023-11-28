import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import {
	ConfiguratorTranslateSharedModule,
	SubscriptionsManager,
} from 'configurator-core';
import { TitleModule } from '../../configurator-forms';
import { CheckboxGroupModule } from '../../checkbox-group';
import { MessageModule } from '../../message';
import { TemperatureInputModule } from '../../temperature-input';
import { PoolUsageFormComponent } from './pool-usage-form.component';
import { YesNoQuestionModule } from '../../radio-button-list/yes-no-question';
import { registerLocaleData } from '@angular/common';

import localeES from '@angular/common/locales/es';
registerLocaleData(localeES);

@NgModule({
	declarations: [PoolUsageFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		ConfiguratorTranslateSharedModule,
		TitleModule,
		CheckboxGroupModule,
		MessageModule,
		TemperatureInputModule,
		YesNoQuestionModule,
	],
	exports: [PoolUsageFormComponent],
	providers: [
		{
			provide: SubscriptionsManager,
			useValue: new SubscriptionsManager(),
		},
		{
			provide: DEFAULT_CURRENCY_CODE,
			useValue: 'EUR',
		},
		{
			provide: LOCALE_ID,
			useValue: 'es'
		}
	],
})
export class PoolUsageFormModule {}
