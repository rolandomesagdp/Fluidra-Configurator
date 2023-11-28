import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureInputComponent } from './temperature-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [TemperatureInputComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
	exports: [TemperatureInputComponent],
})
export class TemperatureInputModule {}
