import { AppModule } from './../../../app.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { Router } from '@angular/router';
import { AnalysisService, SpyOf } from 'configurator-core';
import { of } from 'rxjs';
import AnalysisModule from '../../analysis.module';

import { PoolCharacteristicsComponent } from './pool-characteristics.component';
import { PoolModule } from '../pool.module';

describe('PoolCharacteristicsComponent', () => {
	let component: PoolCharacteristicsComponent;
	let fixture: ComponentFixture<PoolCharacteristicsComponent>;

	let loader: HarnessLoader;

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

		router = jasmine.createSpyObj('Router', {
			navigate: jasmine.createSpy('navigate'),
		});

		TestBed.configureTestingModule({
			declarations: [PoolCharacteristicsComponent],
			imports: [AppModule, AnalysisModule, PoolModule],
			providers: [
				{
					provide: Router,
					useValue: router,
				},
				{ provide: AnalysisService, useValue: analysisMockService },
			],
		});

		fixture = TestBed.createComponent(PoolCharacteristicsComponent);
		component = fixture.componentInstance;

		loader = TestbedHarnessEnvironment.loader(fixture);
		component.analysisId = 1;

		fixture.detectChanges();
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
		// expect(poolCharacteristics.build).toHaveBeenCalled();
	});

	it('when onSubmit with valid form is called it should call to save service', async () => {
		// arrange
		component.poolCharacteristicsFormManager.formGroup
			.get('place')
			?.setValue('outdoor');
		component.poolCharacteristicsFormManager.formGroup
			.get('ground')
			?.setValue(true);
		component.poolCharacteristicsFormManager.formGroup
			.get('hasCover')
			?.setValue(true);
		component.poolCharacteristicsFormManager.formGroup
			.get('shelter')
			?.setValue(false);
		component.poolCharacteristicsFormManager.formGroup
			.get('shape')
			?.setValue('round');
		component.poolCharacteristicsFormManager.formGroup
			.get('type')
			?.setValue('swimming_pool');
		component.poolCharacteristicsFormManager.formGroup
			.get('dimension.depth')
			?.setValue(2);
		component.poolCharacteristicsFormManager.formGroup
			.get('dimension.diameter')
			?.setValue(5);
		component.poolCharacteristicsFormManager.formGroup
			.get('heated')
			?.setValue(false);
		component.poolCharacteristicsFormManager.formGroup
			.get('countryCode')
			?.setValue('ES');
		component.poolCharacteristicsFormManager.formGroup
			.get('zipCode')
			?.setValue(12345);
		component.poolCharacteristicsFormManager.formGroup
			.get('dimension.length')
			?.setValue(10);
		component.poolCharacteristicsFormManager.formGroup
			.get('dimension.width')
			?.setValue(5);
		component.poolCharacteristicsFormManager.formGroup
			.get('dimension.surface')
			?.setValue(50);
		component.poolCharacteristicsFormManager.formGroup
			.get('dimension.volume')
			?.setValue(100);

		// act
		await component.onSubmit();

		// assert
		expect(analysisMockService.savePoolCharacteristics).toHaveBeenCalled();
	});

	it('when onSubmit with invalid form is called it should prevent to call save service', () => {
		// arrange
		component.poolCharacteristicsFormManager.formGroup
			.get('place')
			?.setValue(null);
		// act
		component.onSubmit();
		// assert
		expect(analysisMockService.savePoolCharacteristics).not.toHaveBeenCalled();
	});

	describe('Navigation buttons', () => {
		it('should not show the back button', () => {
			const backButton =
				fixture.nativeElement.querySelector('#back_button_test');
			expect(backButton).toBeFalsy();
		});

		it('should show the next button', () => {
			const nextButton =
				fixture.nativeElement.querySelector('#next_button_test');
			expect(nextButton).toBeTruthy();
		});

		it('should call onSubmit when next button is clicked', () => {
			const nextButton =
				fixture.nativeElement.querySelector('#next_button_test');
			const onSubmitSpy = spyOn<any>(component, 'onSubmit');
			nextButton.click();
			expect(onSubmitSpy).toHaveBeenCalled();
		});
	});

	describe('Outdoor Indoor Selection', () => {
		let radioButton: MatRadioGroupHarness;

		beforeEach(async () => {
			radioButton = await loader.getHarness(
				MatRadioGroupHarness.with({
					selector: '#place_radio_button .mat-mdc-radio-group',
				})
			);
		});

		it('should not have default value', async () => {
			const selected = await radioButton.getCheckedValue();
			expect(selected).toBeFalsy();
		});

		it('should update value', async () => {
			const button = (await radioButton.getRadioButtons())?.[1];
			await button.check();
			const selected = await radioButton.getCheckedValue();
			expect(selected).toBe(await button.getValue());
		});

		it('should switch between values', async () => {
			const firstValue = 'outdoor';
			const secondValue = 'indoor';
			const button = await radioButton.getRadioButtons();
			button[0].check();

			let selected = await radioButton.getCheckedValue();
			expect(selected).toBe(firstValue);
			button[1].check();

			selected = await radioButton.getCheckedValue();
			expect(selected).toBe(secondValue);
		});

		it('should show error when no value is selected', async () => {
			let errorMessage: HTMLElement;

			errorMessage = fixture.nativeElement.querySelector('#place_error');
			expect(errorMessage).toBeFalsy();

			const nextButton =
				fixture.nativeElement.querySelector('#next_button_test');
			nextButton.click();
			fixture.detectChanges();

			errorMessage = fixture.nativeElement.querySelector('#place_error');
			expect(errorMessage).toBeTruthy();

			const radioButton =
				fixture.nativeElement.querySelector('.radio_button_test');
			expect(radioButton.classList.contains('error')).toBeTrue();
		});
	});

	describe('Type of pool', () => {
		let checkboxGroup: MatCheckboxHarness[];

		beforeEach(async () => {
			checkboxGroup = await loader.getAllHarnesses(
				MatCheckboxHarness.with({
					selector: '#type_checkbox_group .checkbox_test',
				})
			);
		});

		it('should not have default value', async () => {
			const checkedPool = await checkboxGroup[0].isChecked();
			const checkedSpa = await checkboxGroup[1].isChecked();

			expect(checkedPool).toBe(false);
			expect(checkedSpa).toBe(false);
		});

		it('should select one values', async () => {
			await checkboxGroup[0].check();
			const checkedPool = await checkboxGroup[0].isChecked();
			const checkedSpa = await checkboxGroup[1].isChecked();

			expect(checkedPool).toBe(true);
			expect(checkedSpa).toBe(false);
		});

		it('should select both values', async () => {
			await checkboxGroup[0].check();
			await checkboxGroup[1].check();
			const checkedPool = await checkboxGroup[0].isChecked();
			const checkedSpa = await checkboxGroup[1].isChecked();

			expect(checkedPool).toBe(true);
			expect(checkedSpa).toBe(true);
		});

		it('should select and deselect one value', async () => {
			await checkboxGroup[0].check();
			await checkboxGroup[0].uncheck();
			const checkedPool = await checkboxGroup[0].isChecked();
			const checkedSpa = await checkboxGroup[1].isChecked();

			expect(checkedPool).toBe(false);
			expect(checkedSpa).toBe(false);
		});

		it('should show error when no value is selected', () => {
			let errorMessage: HTMLElement;

			errorMessage = fixture.nativeElement.querySelector('#type_error');
			expect(errorMessage).toBeFalsy();

			const nextButton =
				fixture.nativeElement.querySelector('#next_button_test');
			nextButton.click();
			fixture.detectChanges();

			errorMessage = fixture.nativeElement.querySelector('#type_error');
			expect(errorMessage).toBeTruthy();

			const checkboxButton =
				fixture.nativeElement.querySelector('.checkbox_test');
			expect(checkboxButton.classList.contains('error')).toBeTrue();
		});

		it('should have default value in Above ground or inground question', async () => {
			const selectAll = await loader.getHarness(
				MatSlideToggleHarness.with({
					selector: '#ground_slide_toggle',
				})
			);

			const checked = await selectAll.isChecked();
			expect(checked).toBe(true);
		});
	});

	describe('Shape of pool', () => {
		it('should not have default value', () => {
			const initialValue =
				component.poolCharacteristicsFormManager.formGroup.get('shape').value;
			expect(initialValue).toBeFalsy();
		});

		it('should update value', () => {
			const button = fixture.nativeElement.querySelector('.shape_button_test');
			button.click();
			const value =
				component.poolCharacteristicsFormManager.formGroup.get('shape').value;
			expect(value).toBe('rectangular');
		});

		it('should switch between values', () => {
			const buttons =
				fixture.nativeElement.querySelectorAll('.shape_button_test');
			buttons[0].click();
			let value =
				component.poolCharacteristicsFormManager.formGroup.get('shape').value;
			expect(value).toBe('rectangular');
			buttons[1].click();
			value =
				component.poolCharacteristicsFormManager.formGroup.get('shape').value;
			expect(value).toBe('round');
		});

		it('should show error when no value is selected', () => {
			let errorMessage: HTMLElement;

			errorMessage = fixture.nativeElement.querySelector('#shape_error');
			expect(errorMessage).toBeFalsy();

			const nextButton =
				fixture.nativeElement.querySelector('#next_button_test');
			nextButton.click();
			fixture.detectChanges();

			errorMessage = fixture.nativeElement.querySelector('#shape_error');
			expect(errorMessage).toBeTruthy();

			const radioButton =
				fixture.nativeElement.querySelector('.shape_button_test');
			expect(radioButton.classList.contains('error')).toBeTrue();
		});
	});

	describe('Pool Equipment', () => {
		it('should not have default value', () => {
			const hasCoverValue =
				component.poolCharacteristicsFormManager.formGroup.get(
					'hasCover'
				).value;
			component;
			expect(hasCoverValue).toBeFalsy();

			const shelterValue =
				component.poolCharacteristicsFormManager.formGroup.get('shelter').value;
			expect(shelterValue).toBeFalsy();
		});

		it('should show error when no value is selected', () => {
			let errorMessage: HTMLElement;

			errorMessage = fixture.nativeElement.querySelector('#yes_no_error');
			expect(errorMessage).toBeFalsy();

			const nextButton =
				fixture.nativeElement.querySelector('#next_button_test');
			nextButton.click();
			fixture.detectChanges();

			errorMessage = fixture.nativeElement.querySelector('#yes_no_error');
			expect(errorMessage).toBeTruthy();

			const yesNoQuestion = fixture.nativeElement.querySelector(
				'.yes_answer_label_test'
			);
			expect(yesNoQuestion.classList.contains('error')).toBeTrue();
		});

		it('should update value after click', () => {
			const yesNoQuestion =
				fixture.nativeElement.querySelector('.yes_answer_test');
			yesNoQuestion.click();
			const yesNoQuestionValue =
				component.poolCharacteristicsFormManager.formGroup.get(
					'hasCover'
				).value;
			expect(yesNoQuestionValue).toBeTrue();
		});

		it('should switch between values', () => {
			let yesNoQuestion =
				fixture.nativeElement.querySelector('.yes_answer_test');
			yesNoQuestion.click();
			let yesNoQuestionValue =
				component.poolCharacteristicsFormManager.formGroup.get(
					'hasCover'
				).value;
			expect(yesNoQuestionValue).toBeTrue();

			yesNoQuestion = fixture.nativeElement.querySelector('.no_answer_test');
			yesNoQuestion.click();
			yesNoQuestionValue =
				component.poolCharacteristicsFormManager.formGroup.get(
					'hasCover'
				).value;
			expect(yesNoQuestionValue).toBeFalse();
		});

		it('should show Info Message by default', () => {
			const infoMessage = fixture.nativeElement.querySelector(
				'#info_equipment_message #message_test'
			);
			expect(infoMessage).toBeTruthy();
		});

		it('should show Remember Message by selecting NO on both questions', () => {
			let rememberMessage = fixture.nativeElement.querySelector(
				'#remember_equipment_message'
			);
			expect(rememberMessage).toBeFalsy();
			const noButtons =
				fixture.nativeElement.querySelectorAll('.no_answer_test');
			noButtons[0].click();
			noButtons[1].click();
			fixture.detectChanges();
			rememberMessage = fixture.nativeElement.querySelector(
				'#remember_equipment_message'
			);
			expect(rememberMessage).toBeTruthy();
		});

		it('should close the message by clicking on the close button', () => {
			let infoMessage = fixture.nativeElement.querySelector(
				'#info_equipment_message #message_test'
			);
			expect(infoMessage).toBeTruthy();

			const closeButton = fixture.nativeElement.querySelector(
				'#info_equipment_message .icon_close'
			);
			closeButton.click();
			fixture.detectChanges();

			infoMessage = fixture.nativeElement.querySelector(
				'#info_equipment_message #message_test'
			);

			expect(infoMessage).toBeFalsy();
		});

		it('should not have heated value by default', () => {
			const initialValue =
				component.poolCharacteristicsFormManager.formGroup.get('heated').value;
			expect(initialValue).toBeFalsy();
		});

		it('should show heated option when selecting YES on shelter question', () => {
			let heatedOption =
				fixture.nativeElement.querySelector('#heated_question');
			expect(heatedOption).toBeFalsy();
			const button = fixture.nativeElement.querySelector(
				'#shelterQuestion .yes_answer_test'
			);
			button.click();
			fixture.detectChanges();
			heatedOption = fixture.nativeElement.querySelector('#heated_question');
			expect(heatedOption).toBeTruthy();
		});
	});

	xdescribe('Pool location', () => {
		it('should have a Country location default value', () => {
			expect(true).toBe(false);
		});

		it('should not have a ZIP code default value', () => {
			expect(true).toBe(false);
		});

		it('should show error when no value is selected', () => {
			expect(true).toBe(false);
		});

		//TODO:
		xit('should check if the ZIP code is valid for the country', () => {
			expect(true).toBe(false);
		});
	});
});
