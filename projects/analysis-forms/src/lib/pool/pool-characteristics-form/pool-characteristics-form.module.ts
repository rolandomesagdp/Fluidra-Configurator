import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { YesNoQuestionModule } from '../../radio-button-list/yes-no-question';
import { ShapeSelectorModule } from '../../radio-button-list/shape-selector';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { MessageModule } from '../../message';
import { RadioButtonModule } from '../../radio-button-list/radio-button';
import { CheckboxGroupModule } from '../../checkbox-group';
import { RadioButtonListModule } from '../../radio-button-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { PoolDimensionsModule } from '../../pool-dimensions';
import { TitleModule } from '../../configurator-forms';
import { PoolCharacteristicsFormComponent } from './pool-characteristics-form.component';

@NgModule({
	declarations: [PoolCharacteristicsFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		YesNoQuestionModule,
		ShapeSelectorModule,
		ConfiguratorTranslateSharedModule,
		MessageModule,
		RadioButtonModule,
		CheckboxGroupModule,
		MatIconModule,
		MatSlideToggleModule,
		RadioButtonListModule,
		MatCheckboxModule,
		PoolDimensionsModule,
		TitleModule,
		MatSelectModule,
	],
	exports: [PoolCharacteristicsFormComponent],
})
export class PoolCharacteristicsFormModule {}
