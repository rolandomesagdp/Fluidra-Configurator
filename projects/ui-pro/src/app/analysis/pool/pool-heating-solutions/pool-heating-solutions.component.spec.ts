import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../../../app.module';
import AnalysisModule from '../../analysis.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { SpyOf, autoSpy, AnalysisService } from 'configurator-core';
import { PoolModule } from '../pool.module';
import { Router } from '@angular/router';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';
import { of } from 'rxjs/internal/observable/of';
import { PoolHeatingSolutionsComponent } from './pool-heating-solutions.component';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('PoolHeatingSolutionsComponent', () => {
	let component: PoolHeatingSolutionsComponent;
	let fixture: ComponentFixture<PoolHeatingSolutionsComponent>;
	let loader: HarnessLoader;

	let submitButton: MatButtonHarness;

	const router: SpyOf<Router> = autoSpy(Router);
	let analysisMockService: SpyOf<AnalysisService>;
	const toolbarEvents: SpyOf<ToolbarEvents> = autoSpy(ToolbarEvents);

	beforeEach(async () => {
		router.navigate.and.returnValue(Promise.resolve(true));

		analysisMockService = jasmine.createSpyObj('AnalysisService', {
			savePoolCharacteristics: jasmine.createSpy('savePoolCharacteristics'),
			getPoolById: jasmine.createSpy('getPoolById'),
			getAnalysisResult: jasmine.createSpy('getAnalysisById'),
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
				name: 'Pool 1',
				email: 'email@email.com',
				phone: '123456789',
				countryCode: 'ES',
				customerName: 'Customer Name',
				characteristics: {
					hasCover: null,
					shelter: null,
					shape: null,
					ground: null,
					place: null,
					type: null,
					heated: null,
					countryCode: null,
					zipCode: null,
				},
			})
		);
		analysisMockService.getAnalysisResult.and.returnValue(
			of([
				{
					brand: 'Zodiac',
					name: 'Zodiac Z200',
					price: 2000,
				},
				{
					brand: 'Zodiac',
					name: 'Zodiac Z300',
					price: 3000,
				},
				{
					brand: 'AstralPool',
					name: 'AstralPool 200',
					price: 2500,
				},
			])
		);

		TestBed.configureTestingModule({
			declarations: [PoolHeatingSolutionsComponent],
			imports: [AppModule, AnalysisModule, PoolModule],
			providers: [
				{
					provide: Router,
					useValue: router,
				},
				{
					provide: ToolbarEvents,
					useValue: toolbarEvents,
				},
				{ provide: AnalysisService, useValue: analysisMockService },
			],
		});
		fixture = TestBed.createComponent(PoolHeatingSolutionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);

		submitButton = await loader.getHarness(
			MatButtonHarness.with({ selector: '#next_button_test' })
		);
		component.analysisId = 1;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when ngOnInit is called it should call to hide toolbar', () => {
		// act
		component.ngOnInit();
		// assert
		expect(toolbarEvents.showProcessToolbar).toHaveBeenCalled();
		expect(toolbarEvents.hideMainToolbar).toHaveBeenCalled();
	});

	it('when previousStep is called it should call to navigate', () => {
		// arrange

		// act
		component.previousStep();
		// assert
		expect(router.navigate).toHaveBeenCalled();
	});

	describe('form actions', () => {
		it('should call to navigate when submit form', async () => {
			// act
			component.poolHeatingSolutionsFormManager.formGroup.setValue({
				heatPump: true,
				heatPumpInTechnicalRoom: true,
				heatingBrand: 'Zodiac',
			});
			await submitButton.click();
			fixture.detectChanges();

			// assert
			expect(router.navigate).toHaveBeenCalled();
		});

		it('should call markAllAsTouched when submit invalid form', async () => {
			// arrange
			const markAllAsTouchedSpy = spyOn(
				component.poolHeatingSolutionsFormManager.formGroup,
				'markAllAsTouched'
			);
			component.poolHeatingSolutionsFormManager.formGroup.setErrors({
				invalid: true,
			});

			// act
			await submitButton.click();
			fixture.detectChanges();

			// assert
			expect(markAllAsTouchedSpy).toHaveBeenCalled();
		});
	});

	describe('on init the form fields', () => {
		it('heating product type have the default values', () => {
			const heatPumpCheckbox =
				fixture.nativeElement.querySelector('#heatPump_question');

			expect(heatPumpCheckbox.checked).toBeFalsy();
		});

		it('brand have the default values', async () => {
			const fieldInput = await loader.getHarness(
				MatSelectHarness.with({ selector: `#heatingBrand-input` })
			);

			expect(await fieldInput.getValueText()).toEqual(
				'poolHeatingSolutions.brandSection.placeholder'
			);
		});
	});
});
