import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { InputValidationsOptions } from './input-validations-options.interface';
import { DebugElement } from '@angular/core';

export class InputValidationsTests {
	// TODO: Check for use this from core
	// TODO: check the errors form field id (not input) and get all input components by generic clases

	public static validateInput = <T = any>(
		inputHarness: MatInputHarness,
		options: Partial<InputValidationsOptions>,
		fixture: ComponentFixture<T>,
		loader: HarnessLoader
	) => {
		describe(`${inputHarness.getName()} must be validated and show errors`, () => {
			if (options.required) {
				describe('when is required', async () => {
					// TODO: Get this params from options
					const getError = () =>
						fixture.debugElement.query(
							By.css(`#${inputHarness.getName()}-error`)
						);

					const submitButton = await loader.getHarness(
						MatButtonHarness.with({ selector: '#new-analysis_submit-button' })
					);

					this.validateInputRequired(
						inputHarness,
						'dashboard.analysis.name.required',
						getError(),
						submitButton
					);
				});
			}
			// TODO: Add all basic input tests
			if (options.min) {
				describe('when has minLength validator', async () => {
					// TODO: Get this params from options
					const getError = () =>
						fixture.debugElement.query(
							By.css(`#${inputHarness.getName()}-error`)
						);

					const submitButton = await loader.getHarness(
						MatButtonHarness.with({ selector: '#new-analysis_submit-button' })
					);

					this.validateInputMinLength(
						inputHarness,
						'dashboard.analysis.name.minlength',
						getError()
					);
				});
			}

			if (options.max) {
				describe('when has maxLength', async () => {
					// TODO: Get this params from options
					const getError = () =>
						fixture.debugElement.query(
							By.css(`#${inputHarness.getName()}-error`)
						);

					const submitButton = await loader.getHarness(
						MatButtonHarness.with({ selector: '#new-analysis_submit-button' })
					);

					this.validateInputMaxLength(
						inputHarness,
						'dashboard.analysis.name.maxlength',
						getError()
					);
				});
			}

			// TODO: Add min validator
			// TODO: Add max validator

			// TODO: Add label test
			// TODO: Add placeholder test
		});
	};

	public static validateInputRequired = (
		inputHarness: MatInputHarness,
		errorLabel: string,
		errorElement: DebugElement,
		submitButtonHarness: MatButtonHarness
	) => {
		it('should not display error on init', async () => {
			// check error no exist
			expect(errorElement).toBeNull();
		});

		it('should only display error when no enter value and click to submit', async () => {
			await submitButtonHarness.click();

			// check error exist
			expect(errorElement).toBeDefined();
			// check show error
			expect(errorElement?.nativeElement?.textContent).toContain(errorLabel);
		});

		it('should display error when set value and crear it', async () => {
			await inputHarness.setValue('test');
			await inputHarness.setValue(null);

			// check error exist
			expect(errorElement).toBeDefined();
			// check show error
			expect(errorElement?.nativeElement?.textContent).toContain(errorLabel);
		});
	};

	public static validateInputMinLength = (
		inputHarness: MatInputHarness,
		errorLabel: string,
		errorElement: DebugElement
	) => {
		it('should show the error message when the input has exceeded the minimum length', () => {});
	};

	public static validateInputMaxLength = (
		inputHarness: MatInputHarness,
		errorLabel: string,
		errorElement: DebugElement
	) => {
		it('should show the error message when the input has exceeded the maximum length', () => {});
	};
}
