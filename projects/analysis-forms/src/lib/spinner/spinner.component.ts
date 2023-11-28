import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerColor } from './spinner-colors';

@Component({
	selector: 'fcc-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	@Input() diameter: number = 60;
	@Input() color: SpinnerColor = 'primary';
	@Input() fixed: boolean = false;
}

@NgModule({
	declarations: [SpinnerComponent],
	imports: [CommonModule, MatProgressSpinnerModule],
	exports: [SpinnerComponent],
})
export class SpinnerModule {}
