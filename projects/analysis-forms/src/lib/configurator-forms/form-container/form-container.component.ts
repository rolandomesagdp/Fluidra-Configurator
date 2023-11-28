import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';

@Component({
	selector: 'fcc-form-container',
	templateUrl: './form-container.component.html',
	styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
	@Input() title: string;
	@Input() step: number;
	@Input() totalSteps: number;
	@Input() type: string;

	stepText: string;

	constructor() {}

	ngOnInit() {
		this.stepText = `${this.step < 10 ? `0${this.step}` : this.step}/${
			this.totalSteps < 10 ? `0${this.totalSteps}` : this.totalSteps
		}`;
	}
}

@NgModule({
	declarations: [FormContainerComponent],
	imports: [
		CommonModule,
		MatProgressBarModule,
		MatChipsModule,
		MatCardModule,
		ConfiguratorTranslateSharedModule,
	],
	exports: [FormContainerComponent],
})
export class FormContainerModule {}
