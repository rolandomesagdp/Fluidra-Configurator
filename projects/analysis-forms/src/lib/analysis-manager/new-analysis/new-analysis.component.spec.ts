import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnalysisComponent } from './new-analysis.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import {
	AnalysisService,
	BackOfficeClientModule,
	PoolAssistantClientModule,
	ConfiguratorTranslateTestModule,
	SpyOf,
	UserService,
} from 'configurator-core';
import { of } from 'rxjs';
import { AnalysisManagerModule } from '../analysis-manager.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('NewAnalysisComponent', () => {
	let component: NewAnalysisComponent;
	let fixture: ComponentFixture<NewAnalysisComponent>;
	let loader: HarnessLoader;
	let userMockService: SpyOf<UserService>;
	let analysisMockService: SpyOf<AnalysisService>;

	const expectFieldName = (fieldName: string, expectText?: string) => {
		const fieldLabel = fixture.debugElement.query(
			By.css(`#${fieldName}-label`)
		);

		//assert
		expect(fieldLabel?.nativeElement?.textContent).toContain(
			expectText || `dashboard.analysis.${fieldName}.label`
		);
	};

	const expectFieldPlaceholder = async (
		fieldName: string,
		expectText?: string
	) => {
		const fieldInput = await loader.getHarness(
			MatInputHarness.with({ selector: `#${fieldName}-input` })
		);

		//assert
		expect(await fieldInput.getPlaceholder()).toContain(
			expectText || `dashboard.analysis.${fieldName}.placeholder`
		);
	};

	beforeEach(() => {
		// set default user service data
		userMockService = jasmine.createSpyObj('UserService', {
			getUsers: jasmine.createSpy('getUsers'),
		});

		userMockService.currentUser = {
			id: 1,
			isAdmin: true,
			name: 'Test',
		};
		userMockService.getUsers.and.returnValue(
			of([
				{
					id: 1,
					name: 'Test',
				},
			])
		);

		analysisMockService = jasmine.createSpyObj('AnalysisService', {
			savePoolGeneralCharacteristics: jasmine.createSpy(
				'savePoolGeneralCharacteristics'
			),
		});

		analysisMockService.savePoolGeneralCharacteristics.and.returnValue(
			of({
				id: 1,
				name: 'Test',
			})
		);

		TestBed.configureTestingModule({
			declarations: [NewAnalysisComponent],
			imports: [
				BrowserModule,
				BrowserAnimationsModule,
				AnalysisManagerModule,
				BackOfficeClientModule.forRoot({
					baseUrl: '',
				}),
				,
				PoolAssistantClientModule.forRoot({
					baseUrl: '',
				}),
				,
				ConfiguratorTranslateTestModule,
			],
			providers: [
				{
					provide: UserService,
					useValue: userMockService,
				},
				{
					provide: AnalysisService,
					useValue: analysisMockService,
				},
			],
		});
		fixture = TestBed.createComponent(NewAnalysisComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		loader = TestbedHarnessEnvironment.loader(fixture);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('as profesional user', () => {
		beforeEach(() => {
			// arrange
			// set user as profesional
			userMockService.currentUser.isAdmin = false;
		});

		it('should render specific fields labels', async () => {
			//act
			await fixture.whenStable();

			//assert
			expectFieldName('name');
			expectFieldName('customerName');
			expectFieldName('email');
			expectFieldName('phone');
		});

		it('should render specific fields placeholders', async () => {
			//act
			await fixture.whenStable();

			//assert
			await expectFieldPlaceholder('name');
			await expectFieldPlaceholder('customerName');
			await expectFieldPlaceholder('email');
			await expectFieldPlaceholder(
				'phone-number',
				'dashboard.analysis.phone.placeholder'
			);
		});
	});

	describe('as administrator user', () => {
		beforeEach(() => {
			// arrange
			// set user as profesional
			userMockService.currentUser.isAdmin = true;
		});

		it('should render specific fields labels', async () => {
			//act
			await fixture.whenStable();

			//assert
			expectFieldName('professional');
			expectFieldName('name');
			expectFieldName('customerName');
			expectFieldName('email');
			expectFieldName('phone');
		});

		it('should render specific fields placeholders', async () => {
			//act
			await fixture.whenStable();

			//assert
			await expectFieldPlaceholder('professional');
			await expectFieldPlaceholder('name');
			await expectFieldPlaceholder('customerName');
			await expectFieldPlaceholder('email');
			await expectFieldPlaceholder(
				'phone-number',
				'dashboard.analysis.phone.placeholder'
			);
		});

		it('the profesional user should be loaded on init', () => {
			expect(userMockService.getUsers).toHaveBeenCalled();
		});

		it('the profesional user should be reloaded when user type something', async () => {
			//act
			await fixture.whenStable();

			const profesionalMatInput = await loader.getHarness(
				MatInputHarness.with({ selector: `#professional-input` })
			);

			await profesionalMatInput.setValue('Test');

			expect(userMockService.getUsers).toHaveBeenCalledWith('Test');
		});
	});

	it('should only display error when no enter name and click to submit', async () => {
		// check error no exist
		expect(fixture.debugElement.query(By.css('#name-error'))).toBeNull();

		const submitButton = await loader.getHarness(
			MatButtonHarness.with({ selector: '#new-analysis_submit-button' })
		);

		await submitButton.click();

		const error = fixture.debugElement.query(By.css('#name-error'));
		// check error exist
		expect(error).toBeDefined();
		// check show error
		expect(error?.nativeElement?.textContent).toContain(
			'dashboard.analysis.name.required'
		);
	});

	it('should display error when enter invalid mail', async () => {
		const emailInput = await loader.getHarness(
			MatInputHarness.with({ selector: '#email-input' })
		);

		await emailInput.setValue('example.@com');
		await emailInput.blur();

		const error = fixture.debugElement.query(By.css('#email-error'));

		// check error exist
		expect(error).toBeDefined();
		// check show error
		expect(error?.nativeElement?.textContent).toContain(
			'dashboard.analysis.email.pattern'
		);
	});

	it('should display error when enter invalid phone', async () => {
		const phoneInput = await loader.getHarness(
			MatInputHarness.with({ selector: '#phone-number-input' })
		);

		await phoneInput.setValue('invalid');
		await phoneInput.blur();

		const error = fixture.debugElement.query(By.css('#phone-number-error'));
		// check error exist
		expect(error).toBeDefined();
		// check show error
		expect(error?.nativeElement?.textContent).toContain(
			'dashboard.analysis.phone.pattern'
		);
	});

	it('should form be valid and call to server when set all right values', async () => {
		// arrange
		const nameInput = await loader.getHarness(
			MatInputHarness.with({ selector: '#name-input' })
		);

		const customerNameInput = await loader.getHarness(
			MatInputHarness.with({ selector: '#customerName-input' })
		);

		const emailInput = await loader.getHarness(
			MatInputHarness.with({ selector: '#email-input' })
		);

		const phoneInput = await loader.getHarness(
			MatInputHarness.with({ selector: '#phone-number-input' })
		);

		const submitButton = await loader.getHarness(
			MatButtonHarness.with({ selector: '#new-analysis_submit-button' })
		);

		// act
		await nameInput.setValue('validName');

		await emailInput.setValue('valid@email.com');
		await phoneInput.setValue('5874874');
		await customerNameInput.setValue('5874874');

		// refresh form and view
		// component.newAnalysisForm.markAllAsTouched();
		component.newAnalysisForm.updateValueAndValidity();
		fixture.detectChanges();

		expect(component.newAnalysisForm.valid).toBeTrue();

		await submitButton.click();

		// assert
		expect(
			analysisMockService.savePoolGeneralCharacteristics
		).toHaveBeenCalledWith(
			Object({
				id: undefined,
				name: 'validName',
				email: 'valid@email.com',
				customerName: '5874874',
				countryCode: '+34',
				phone: '5874874',
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
			})
		);
	});
});
