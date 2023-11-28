import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	NgModule,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { SpinnerModule } from '../spinner';

@Component({
	selector: 'fcc-navigation-buttons',
	templateUrl: './navigation-buttons.component.html',
	styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationButtonsComponent {
	@Input() step: number;
	@Input() totalSteps: number;

	@Input() saving: boolean;

	@Output() previousStep: EventEmitter<void> = new EventEmitter();

	back() {
		this.previousStep.emit();
	}
}

@NgModule({
	declarations: [NavigationButtonsComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		ConfiguratorTranslateSharedModule,
		SpinnerModule,
	],
	exports: [NavigationButtonsComponent],
})
export class NavigationButtonsModule {}
