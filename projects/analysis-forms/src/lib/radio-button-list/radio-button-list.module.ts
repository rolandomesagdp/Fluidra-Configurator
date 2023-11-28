import { YesNoQuestionModule } from './yes-no-question/yes-no-question.component';
import { ShapeSelectorModule } from './shape-selector/shape-selector.component';
import { RadioButtonModule } from './radio-button/radio-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RadioButtonModule,
		ShapeSelectorModule,
		YesNoQuestionModule,
	],
	exports: [RadioButtonModule, ShapeSelectorModule, YesNoQuestionModule],
})
export class RadioButtonListModule {}
