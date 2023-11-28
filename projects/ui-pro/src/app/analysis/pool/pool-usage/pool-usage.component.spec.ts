import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolUsageComponent } from './pool-usage.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import {
	SpyOf,
	AnalysisService,
	Months,
	PowerSupplyType,
	PoolPrivacy,
	FiltrationType,
} from 'configurator-core';
import { of } from 'rxjs';
import { AppModule } from '../../../app.module';
import AnalysisModule from '../../analysis.module';
import { PoolModule } from '../pool.module';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { By } from '@angular/platform-browser';
import { MatSelectHarness } from '@angular/material/select/testing';

xdescribe('PoolUsageComponent', () => {
	let component: PoolUsageComponent;
	let fixture: ComponentFixture<PoolUsageComponent>;

	let loader: HarnessLoader;

	let submitButton: MatButtonHarness;

	let periodCheckboxGroup: MatCheckboxHarness[];

	let targetWaterTemperatureInput: MatInputHarness;
	let currentWaterTemperatureInput: MatInputHarness;

	let filtrationTimeInput: MatInputHarness;

	let powerSupplyTypeInput: MatSelectHarness;

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
				usage: Object({
					periodOfUseMonths: [
						Months.May,
						Months.June,
						Months.July,
						Months.August,
						Months.September,
					],
					currentWaterTemperature: 15,
					targetWaterTemperature: 26,
					filtrationTime: 13,
					powerSupplyType: PowerSupplyType.BothPhases,
					attendance: PoolPrivacy.PRIVATE,
					filtrationType: FiltrationType.SKIMMER,
				}),
			})
		);

		router = jasmine.createSpyObj('Router', {
			navigate: jasmine.createSpy('navigate'),
		});

		TestBed.configureTestingModule({
			declarations: [PoolUsageComponent],
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

		fixture = TestBed.createComponent(PoolUsageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);

		submitButton = await loader.getHarness(
			MatButtonHarness.with({ selector: '#next_button_test' })
		);

		periodCheckboxGroup = await loader.getAllHarnesses(
			MatCheckboxHarness.with({
				selector: '#period .checkbox_test',
			})
		);

		targetWaterTemperatureInput = await loader.getHarness(
			MatInputHarness.with({
				selector: `#target-water-temperature .main-input`,
			})
		);

		currentWaterTemperatureInput = await loader.getHarness(
			MatInputHarness.with({
				selector: `#current-water-temperature .main-input`,
			})
		);

		filtrationTimeInput = await loader.getHarness(
			MatInputHarness.with({
				selector: `#filtrationTime-input`,
			})
		);

		powerSupplyTypeInput = await loader.getHarness(
			MatSelectHarness.with({
				selector: `#powerSupplyType-input`,
			})
		);

		component.analysisId = 1;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('form actions', () => {
		it('should prevent call to api when submit invalid form', async () => {
			// set invalid data
			await currentWaterTemperatureInput.setValue('-999999');

			// act
			await submitButton.click();

			// assert
			expect(
				analysisMockService.savePoolCharacteristics
			).not.toHaveBeenCalled();
		});

		it('should call to the api with all data when submit valid form', async () => {
			// set valid data
			await currentWaterTemperatureInput.setValue('20');
			await targetWaterTemperatureInput.setValue('30');

			await periodCheckboxGroup[0].check();

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
						altitude: 50,
						wind: 'medium',
						climateZone: null,
					}),
					usage: Object({
						periodOfUseMonths: [
							'May',
							'June',
							'July',
							'August',
							'September',
							'January',
						],
						currentWaterTemperature: 20,
						targetWaterTemperature: 30,
						filtrationTime: 24,
						powerSupplyType: PowerSupplyType.BothPhases,
						attendance: PoolPrivacy.PRIVATE,
						filtrationType: FiltrationType.SKIMMER,
					}),
				})
			);
		});
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
		// expect(poolUsageFormManager.build).toHaveBeenCalled();
	});

	xit('when onSubmit with valid form is called it should call to save service', async () => {
		// arrange
		component.poolUsageFormManager.formGroup
			.get('periodOfUseMonths')
			?.setValue([Months.April]);
		component.poolUsageFormManager.formGroup
			.get('currentWaterTemperature')
			?.setValue(20);
		component.poolUsageFormManager.formGroup
			.get('targetWaterTemperature')
			?.setValue(30);

		// act
		await component.onSubmit();
		// assert
		expect(analysisMockService.savePoolCharacteristics).toHaveBeenCalled();
	});

	it('when onSubmit with invalid form is called it should prevent to call save service', () => {
		// arrange
		component.poolUsageFormManager.formGroup
			.get('periodOfUseMonths')
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

	describe('period validators', () => {
		it('should have a default value', async () => {
			await fixture.whenStable();

			const value = [];
			for (const periodCheckbox of periodCheckboxGroup) {
				if (await periodCheckbox.isChecked()) {
					value.push(await periodCheckbox.getValue());
				}
			}

			// assert
			expect(value).toEqual(['May', 'June', 'July', 'August', 'September']);
		});

		it('should show error when clear the input value', async () => {
			//act
			for (const periodCheckbox of periodCheckboxGroup) {
				if (await periodCheckbox.isChecked()) {
					await periodCheckbox.uncheck();
				}
			}
			// get error element
			const periodError = fixture.debugElement.query(
				By.css('#period-error-required')
			);
			// assert
			expect(periodError?.nativeElement?.textContent).toContain(
				'poolUsage.period.required'
			);
		});

		it('should set value of selected periods from May to September', async () => {
			// arrage reset values
			for (const periodCheckbox of periodCheckboxGroup) {
				if (await periodCheckbox.isChecked()) {
					await periodCheckbox.uncheck();
				}
			}

			//act
			for (const periodCheckbox of periodCheckboxGroup) {
				if (
					['May', 'June', 'July', 'August', 'September'].includes(
						await periodCheckbox.getValue()
					)
				) {
					await periodCheckbox.check();
				}
			}

			// assert
			const value = [];
			for (const periodCheckbox of periodCheckboxGroup) {
				if (await periodCheckbox.isChecked()) {
					value.push(await periodCheckbox.getValue());
				}
			}

			expect(value).toEqual(['May', 'June', 'July', 'August', 'September']);
		});

		it('should set value of selected periods from September to May', async () => {
			// arrange reset values
			for (const periodCheckbox of periodCheckboxGroup) {
				if (await periodCheckbox.isChecked()) {
					await periodCheckbox.uncheck();
				}
			}

			//act
			for (const periodCheckbox of periodCheckboxGroup) {
				if (
					[
						'September',
						'October',
						'November',
						'December',
						'January',
						'February',
						'March',
						'April',
					].includes(await periodCheckbox.getValue())
				) {
					await periodCheckbox.check();
				}
			}

			// assert
			const value = [];
			for (const periodCheckbox of periodCheckboxGroup) {
				if (await periodCheckbox.isChecked()) {
					value.push(await periodCheckbox.getValue());
				}
			}

			expect(value).toEqual([
				'January',
				'February',
				'March',
				'April',
				'September',
				'October',
				'November',
				'December',
			]);
		});
	});

	describe('current water temperature validators', () => {
		it('should have a default value', async () => {
			// assert
			expect(await currentWaterTemperatureInput.getValue()).toEqual('15');
		});

		it('should show error when clear the input value', async () => {
			//act
			await currentWaterTemperatureInput.setValue(null);
			await currentWaterTemperatureInput.blur();
			// get error element
			const currentWaterTemperatureError = fixture.debugElement.query(
				By.css('#currentWaterTemperature-error-required')
			);
			// assert
			expect(
				currentWaterTemperatureError?.nativeElement?.textContent
			).toContain('poolUsage.waterTemperature.required');
		});

		it('should show error when exceded the input  maximum value', async () => {
			await currentWaterTemperatureInput.setValue('999999');
			await currentWaterTemperatureInput.blur();

			// get error element
			const currentWaterTemperatureError = fixture.debugElement.query(
				By.css('#currentWaterTemperature-error-max')
			);
			// assert
			expect(
				currentWaterTemperatureError?.nativeElement?.textContent
			).toContain('poolUsage.waterTemperature.max');
		});

		it('should show error when input value not reach the minimum', async () => {
			await currentWaterTemperatureInput.setValue('-1');
			await currentWaterTemperatureInput.blur();

			// get error element
			const currentWaterTemperatureError = fixture.debugElement.query(
				By.css('#currentWaterTemperature-error-min')
			);
			// assert
			expect(
				currentWaterTemperatureError?.nativeElement?.textContent
			).toContain('poolUsage.waterTemperature.min');
		});
	});

	describe('target water temperature validators', () => {
		it('should have a default value', async () => {
			// assert
			expect(await targetWaterTemperatureInput.getValue()).toEqual('26');
		});

		it('should show error when clear the input value', async () => {
			//act
			await targetWaterTemperatureInput.setValue(null);
			await targetWaterTemperatureInput.blur();
			// get error element
			const targetWaterTemperatureError = fixture.debugElement.query(
				By.css('#targetWaterTemperature-error-required')
			);
			// assert
			expect(targetWaterTemperatureError?.nativeElement?.textContent).toContain(
				'poolUsage.waterTemperature.required'
			);
		});

		it('should show error when exceded the input  maximum value', async () => {
			await targetWaterTemperatureInput.setValue('999999');
			await targetWaterTemperatureInput.blur();

			// get error element
			const targetWaterTemperatureError = fixture.debugElement.query(
				By.css('#targetWaterTemperature-error-max')
			);
			// assert
			expect(targetWaterTemperatureError?.nativeElement?.textContent).toContain(
				'poolUsage.waterTemperature.max'
			);
		});

		it('should show error when input value not reach the minimum', async () => {
			await targetWaterTemperatureInput.setValue('-1');
			await targetWaterTemperatureInput.blur();

			// get error element
			const targetWaterTemperatureError = fixture.debugElement.query(
				By.css('#targetWaterTemperature-error-min')
			);

			// assert
			expect(targetWaterTemperatureError?.nativeElement?.textContent).toContain(
				'poolUsage.waterTemperature.min'
			);
		});
	});

	describe('filtration time validators', () => {
		it('should have a default value', async () => {
			// assert
			expect(await filtrationTimeInput.getValue()).toEqual('13');
		});

		it('should show error when clear the input value', async () => {
			//act
			await filtrationTimeInput.setValue(null);
			await filtrationTimeInput.blur();
			// get error element
			const filtrationTimeError = fixture.debugElement.query(
				By.css('#filtrationTime-error-required')
			);
			// assert
			expect(filtrationTimeError?.nativeElement?.textContent).toContain(
				'poolUsage.filtrationTime.required'
			);
		});

		it('should show error when exceded the input  maximum value', async () => {
			await filtrationTimeInput.setValue('999999');
			await filtrationTimeInput.blur();

			// get error element
			const filtrationTimeError = fixture.debugElement.query(
				By.css('#filtrationTime-error-max')
			);
			// assert
			expect(filtrationTimeError?.nativeElement?.textContent).toContain(
				'poolUsage.filtrationTime.max'
			);
		});

		it('should show error when input value not reach the minimum', async () => {
			await filtrationTimeInput.setValue('-1');
			await filtrationTimeInput.blur();

			// get error element
			const filtrationTimeError = fixture.debugElement.query(
				By.css('#filtrationTime-error-min')
			);

			// assert
			expect(filtrationTimeError?.nativeElement?.textContent).toContain(
				'poolUsage.filtrationTime.min'
			);
		});
	});

	describe('power supply type validators', () => {
		it('should have a default value', async () => {
			// assert
			expect(await powerSupplyTypeInput.getValueText()).toEqual(
				'poolUsage.powerSupplyType.options.' + PowerSupplyType.BothPhases
			);
		});
	});
});
