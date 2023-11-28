import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolGeolocationComponent } from './pool-geolocation.component';
import { AppModule } from '../../../app.module';
import AnalysisModule from '../../analysis.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { MatButtonHarness } from '@angular/material/button/testing';
import { AnalysisService, SpyOf } from 'configurator-core';
import { of } from 'rxjs';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { PoolModule } from '../pool.module';
import { ActivatedRoute, Router } from '@angular/router';

describe('PoolGeolocationComponent', () => {
	let component: PoolGeolocationComponent;
	let fixture: ComponentFixture<PoolGeolocationComponent>;
	let loader: HarnessLoader;

	let submitButton: MatButtonHarness;

	let altitudeInput: MatInputHarness;
	let windInput: MatSelectHarness;
	let climateZonesRadioButtons: MatRadioGroupHarness;

	let analysisMockService: SpyOf<AnalysisService>;

	let router: SpyOf<Router>;

	beforeEach(async () => {
		analysisMockService = jasmine.createSpyObj('AnalysisService', {
			savePoolCharacteristics: jasmine.createSpy('savePoolCharacteristics'),
			getPoolById: jasmine.createSpy('getPoolById'),
		});

		analysisMockService.savePoolCharacteristics.and.returnValue(
			of({
				id: 1,
				name: 'Test',
			})
		);

		analysisMockService.getPoolById.and.returnValue(
			of({
				id: 1,
				name: 'test project',
				email: 'test@example.com',
				customerName: 'Test client',
				countryCode: 'ES',
				phone: '675984575',
				professional: undefined,
				date: '24/10/2023',
				draft: true,
				characteristics: Object({
					hasCover: undefined,
					shelter: undefined,
					shape: undefined,
					ground: undefined,
					place: undefined,
				}),
				geolocation: Object({
					altitude: 50,
					wind: 'medium',
					climateZone: null,
				}),
			})
		);

		router = jasmine.createSpyObj('Router', {
			navigate: jasmine.createSpy('navigate'),
		});

		TestBed.configureTestingModule({
			declarations: [PoolGeolocationComponent],
			imports: [AppModule, AnalysisModule, PoolModule],
			providers: [
				{
					provide: AnalysisService,
					useValue: analysisMockService,
				},
				{
					provide: Router,
					useValue: router,
				},
			],
		});
		fixture = TestBed.createComponent(PoolGeolocationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);

		altitudeInput = await loader.getHarness(
			MatInputHarness.with({ selector: `#altitude-input` })
		);

		windInput = await loader.getHarness(
			MatSelectHarness.with({ selector: `#wind-input` })
		);

		climateZonesRadioButtons = await loader.getHarness(
			MatRadioGroupHarness.with({
				selector: '#climateZone-input .mat-mdc-radio-group',
			})
		);

		submitButton = await loader.getHarness(
			MatButtonHarness.with({ selector: '#next_button_test' })
		);
		component.analysisId = 1;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	xit('when ngOnInit is called it should call to hide toolbar', () => {
		// arrange

		// act
		component.ngOnInit();
		// assert

		// this.toolbarEvents.showProcessToolbar();
		// this.toolbarEvents.hideMainToolbar();
	});

	it('when ngOnInit is called it should call to get current pool', () => {
		// act
		component.ngOnInit();
		// assert
		expect(analysisMockService.getPoolById).toHaveBeenCalledWith(1);
	});

	xit('when ngOnInit is called it should call to build form', () => {
		// arrange

		// act
		component.ngOnInit();
		// assert
		// expect(poolGeolocationFormManager.build).toHaveBeenCalled();
	});

	xit('when onSubmit with valid form is called it should call to save service', async () => {
		// arrange
		component.poolGeolocationFormManager.formGroup
			.get('altitude')
			?.setValue(40);
		component.poolGeolocationFormManager.formGroup.get('wind')?.setValue('low');
		component.poolGeolocationFormManager.formGroup
			.get('climateZone')
			?.setValue('a');

		// act
		await component.onSubmit();
		// assert
		expect(analysisMockService.savePoolCharacteristics).toHaveBeenCalled();
	});

	it('when onSubmit with invalid form is called it should prevent to call save service', () => {
		// arrange
		component.poolGeolocationFormManager.formGroup
			.get('altitude')
			?.setValue(null);
		// act
		component.onSubmit();
		// assert
		expect(analysisMockService.savePoolCharacteristics).not.toHaveBeenCalled();
	});

	it('when previousStep is called it should call to navigate', () => {
		// arrange

		// act
		component.previousStep();
		// assert
		expect(router.navigate).toHaveBeenCalled();
	});

	describe('form actions', () => {
		it('should prevent call to api when submit invalid form', async () => {
			// set invalid data
			await altitudeInput.setValue('-999999');

			// act
			await submitButton.click();

			// assert
			expect(
				analysisMockService.savePoolCharacteristics
			).not.toHaveBeenCalled();
		});

		it('should call to the api with all data when submit valid form', async () => {
			// set valid data
			await altitudeInput.setValue('90');
			await windInput.clickOptions({
				text: 'poolGeolocation.specificities.wind.low',
			});

			// select first result
			const buttons = await climateZonesRadioButtons.getRadioButtons();
			await buttons?.[0]?.check();

			fixture.detectChanges();

			// act
			await submitButton.click();
			fixture.detectChanges();

			// assert
			expect(
				analysisMockService.savePoolCharacteristics
			).toHaveBeenCalledOnceWith(
				Object({
					id: 1,
					name: 'test project',
					email: 'test@example.com',
					customerName: 'Test client',
					countryCode: 'ES',
					phone: '675984575',
					professional: undefined,
					date: '24/10/2023',
					draft: true,
					characteristics: Object({
						hasCover: undefined,
						shelter: undefined,
						shape: undefined,
						ground: undefined,
						place: undefined,
					}),
					geolocation: Object({
						altitude: 90,
						wind: 'low',
						climateZone: 'a',
					}),
				})
			);
		});
	});

	describe('on init the form field', () => {
		it('altitude should have the default values', async () => {
			//assert
			expect(await altitudeInput.getValue()).toBe('50');
		});

		it('wind should have the default values', async () => {
			const fieldInput = await loader.getHarness(
				MatSelectHarness.with({ selector: `#wind-input` })
			);

			//assert
			expect(await fieldInput.getValueText()).toBe(
				'poolGeolocation.specificities.wind.medium'
			);
		});
	});

	describe('altitude validations', () => {
		it('should show error when clear the input value', async () => {
			//act
			await altitudeInput.setValue(null);
			await altitudeInput.blur();
			// get error element
			const altitudeRequiredError = fixture.debugElement.query(
				By.css('#altitude-error-required')
			);
			// assert
			expect(altitudeRequiredError?.nativeElement?.textContent).toContain(
				'poolGeolocation.specificities.altitude.required'
			);
		});

		it('should show error when exceded the input  maximum value', async () => {
			await altitudeInput.setValue('999999');
			await altitudeInput.blur();

			// get error element
			const altitudeMaxError = fixture.debugElement.query(
				By.css('#altitude-error-max')
			);
			// assert
			expect(altitudeMaxError?.nativeElement?.textContent).toContain(
				'poolGeolocation.specificities.altitude.max'
			);
		});

		it('should show error when input value not reach the minimum', async () => {
			await altitudeInput.setValue('-1');
			await altitudeInput.blur();

			// get error element
			const altitudeMinError = fixture.debugElement.query(
				By.css('#altitude-error-min')
			);
			// assert
			expect(altitudeMinError?.nativeElement?.textContent).toContain(
				'poolGeolocation.specificities.altitude.min'
			);
		});
	});

	describe('climateZone validations', () => {
		it('should be without value on init', async () => {
			// assert
			expect(await climateZonesRadioButtons.getCheckedValue()).toBeNull();
		});
		it('should show error when submit form without check one', async () => {
			//act
			await submitButton.click();
			fixture.detectChanges();

			// get error element
			const climateZoneRequiredError = fixture.debugElement.query(
				By.css('#climateZone-error-required')
			);
			// assert
			expect(climateZoneRequiredError?.nativeElement?.textContent).toContain(
				'poolGeolocation.climateZone.required'
			);
		});

		it('should set right value on click option', async () => {
			//act
			const button = (await climateZonesRadioButtons.getRadioButtons())?.[0];
			const expectedValue = await button.getValue();
			await button?.check();

			expect(await button.isChecked()).toBeTrue();

			const selectedValue = await climateZonesRadioButtons.getCheckedValue();

			expect(selectedValue).toBe(expectedValue);
		});
	});
});
