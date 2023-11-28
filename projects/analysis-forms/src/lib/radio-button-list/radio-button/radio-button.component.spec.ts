import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';

import {
	RadioButtonComponent,
	RadioButtonModule,
} from './radio-button.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Radio-buttonComponent', () => {
	let component: RadioButtonComponent;
	let fixture: ComponentFixture<RadioButtonComponent>;
	let loader: HarnessLoader;
	let radioButton: MatRadioGroupHarness;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [RadioButtonComponent],
			imports: [RadioButtonModule, TranslateModule.forRoot()],
			providers: [
				{
					provide: NgControl,
					useValue: new FormControl(),
				},
			],
		});
		fixture = TestBed.createComponent(RadioButtonComponent);
		component = fixture.componentInstance;

		loader = TestbedHarnessEnvironment.loader(fixture);
		radioButton = await loader.getHarness(MatRadioGroupHarness);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update value', async () => {
		const value = 'custom';
		component.options = [{ key: value, label: value }];
		const button = await radioButton.getRadioButtons();
		button[0].check();
		const selected = await radioButton.getCheckedValue();
		expect(selected).toBe(value);
	});

	it('should call onChange when updateValue is called', () => {
		const onChangeSpy = spyOn<any>(component, 'onChange');
		component.value = 'custom';
		expect(onChangeSpy).toHaveBeenCalled();
	});
});
