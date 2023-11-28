import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolProductsComponent } from './pool-products.component';
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

describe('PoolProductsComponent', () => {
	let component: PoolProductsComponent;
	let fixture: ComponentFixture<PoolProductsComponent>;
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

		TestBed.configureTestingModule({
			declarations: [PoolProductsComponent],
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
		fixture = TestBed.createComponent(PoolProductsComponent);
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
			await submitButton.click();
			fixture.detectChanges();

			// assert
			expect(router.navigate).toHaveBeenCalled();
		});

		it('should call markAllAsTouched when submit invalid form', async () => {
			// arrange
			const markAllAsTouchedSpy = spyOn(
				component.poolProductsFormManager.formGroup,
				'markAllAsTouched'
			);
			component.poolProductsFormManager.formGroup.setErrors({ invalid: true });

			// act
			await submitButton.click();
			fixture.detectChanges();

			// assert
			expect(markAllAsTouchedSpy).toHaveBeenCalled();
		});
	});
});
