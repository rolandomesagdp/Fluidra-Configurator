import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
	MakeValueAccessorProvider,
	AbstractValueAccessor,
} from '../../configurator-forms/control-accessor';

@Component({
	selector: 'fcc-yes-no-question',
	templateUrl: './yes-no-question.component.html',
	styleUrls: ['./yes-no-question.component.scss'],
	providers: [MakeValueAccessorProvider(YesNoQuestionComponent)],
})
export class YesNoQuestionComponent extends AbstractValueAccessor {
	@Input() questionText: string;
	@Input() moreInfo: string;
	@Input() hasError: boolean;

	updateValue(newValue: boolean) {
		this.value = newValue;
	}
}

@NgModule({
	declarations: [YesNoQuestionComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		ConfiguratorTranslateSharedModule,
	],
	exports: [YesNoQuestionComponent],
})
export class YesNoQuestionModule {}
