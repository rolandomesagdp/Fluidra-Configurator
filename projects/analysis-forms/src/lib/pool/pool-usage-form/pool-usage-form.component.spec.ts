import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	ControlContainer,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { YesNoQuestionModule } from '../../radio-button-list/yes-no-question';

import { PoolUsageFormComponent } from './pool-usage-form.component';
import { PoolUsageFormModule } from './pool-usage-form.module';
import { PoolUsageFormManager } from './pool-usage-form-manager';
import {
	SubscriptionsManager,
	autoSpy,
	SpyOf,
	UserService,
	TariffService,
	ConfiguratorTranslateTestModule,
} from 'configurator-core';
import { PoolModule } from '../pool.module';

describe('PoolUsageFormManager', () => {
	let component: PoolUsageFormComponent;
	let fixture: ComponentFixture<PoolUsageFormComponent>;

	const subscriptionsManager: SpyOf<SubscriptionsManager> =
		autoSpy(SubscriptionsManager);

	const userService = autoSpy(UserService);
	const tariffService = autoSpy(TariffService);

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PoolUsageFormComponent],
			imports: [
				PoolModule,
				PoolUsageFormModule,
				ReactiveFormsModule,
				FormsModule,
				YesNoQuestionModule,
				ConfiguratorTranslateTestModule,
			],
			providers: [
				{
					provide: ControlContainer,
					useValue: new PoolUsageFormManager().formGroup,
				},
				{ provide: SubscriptionsManager, useValue: subscriptionsManager },
				{ provide: UserService, useValue: userService },
				{ provide: TariffService, useValue: tariffService },
			],
		});

		fixture = TestBed.createComponent(PoolUsageFormComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when ngOnInit called should init the period options', () => {
		// act
		component.ngOnInit();
		// assert
		expect(component.periodOptions).toBeDefined();
	});

	it('when ngOnDestroy is called it should call to unsubscribe all', () => {
		// act
		component.ngOnDestroy();

		// assert
		expect(subscriptionsManager.unsubscribe).toHaveBeenCalled();
	});

	describe('when needShowError is called ', () => {
		it('without touched control and no validations it should return false', () => {
			// arrange
			const formControl = new FormControl(null);
			// act
			const result = component.needShowError(formControl);
			// assert
			expect(result).toBeFalse();
		});

		it('without touched control and validations it should return false', () => {
			// arrange
			const formControl = new FormControl(null, Validators.required);
			// act
			const result = component.needShowError(formControl);
			// assert
			expect(result).toBeFalse();
		});

		it('with specific validator accomplished  it should return false', () => {
			// arrange
			const formControl = new FormControl(null, Validators.required);
			formControl.setValue('test');
			formControl.markAsTouched();
			// act
			const result = component.needShowError(formControl, 'required');
			// assert
			expect(result).toBeFalse();
		});

		it('with specific validator failed it should return false', () => {
			// arrange
			const formControl = new FormControl(null, Validators.required);
			formControl.markAsTouched();
			// act
			const result = component.needShowError(formControl, 'required');
			// assert
			expect(result).toBeTrue();
		});
	});

	xit('when showCalculateInfo is called it should', () => {
		// arrange
		// act
		component.showCalculateInfo();
		// assert
		// expect(p).toEqual
	});

	describe('when preventPressDecimals is called ', () => {
		it('with pressed decimal marker it should stop the event', () => {
			// arrange
			const event: SpyOf<KeyboardEvent> = jasmine.createSpyObj('event', {
				preventDefault: jasmine.createSpy('preventDefault'),
				stopPropagation: jasmine.createSpy('stopPropagation'),
			});
			event.key = '.';

			// act
			component.preventPressDecimals(event as KeyboardEvent);

			// assert
			expect(event.preventDefault).toHaveBeenCalled();
			expect(event.stopPropagation).toHaveBeenCalled();
		});

		it('with pressed number it should prevent to stop the event', () => {
			// arrange
			const event: SpyOf<KeyboardEvent> = jasmine.createSpyObj('event', {
				preventDefault: jasmine.createSpy('preventDefault'),
				stopPropagation: jasmine.createSpy('stopPropagation'),
			});
			event.key = '1';

			// act
			component.preventPressDecimals(event as KeyboardEvent);

			// assert
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(event.stopPropagation).not.toHaveBeenCalled();
		});
	});

	describe('when preventSetDecimals is called', () => {
		it('with decimals it should set the value as integer', () => {
			// arrange
			const event = {
				target: {
					value: '10.45',
				},
			};

			// act
			component.preventSetDecimals(event as any as InputEvent);

			// assert
			expect(event.target['value']).toEqual('10');
		});

		it('with integer it should return the same number', () => {
			// arrange
			const event = {
				target: {
					value: '10',
				},
			};

			// act
			component.preventSetDecimals(event as any as InputEvent);

			// assert
			expect(event.target['value']).toEqual('10');
		});
	});
});
