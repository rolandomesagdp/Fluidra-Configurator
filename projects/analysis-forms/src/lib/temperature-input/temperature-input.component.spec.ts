import { SpyOf } from 'configurator-core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureInputComponent } from './temperature-input.component';
import { TemperatureInputModule } from './temperature-input.module';
import { NgControl, FormControl } from '@angular/forms';

describe('TemperatureInputComponent', () => {
	let component: TemperatureInputComponent;
	let fixture: ComponentFixture<TemperatureInputComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TemperatureInputComponent],
			imports: [TemperatureInputModule],
			providers: [
				{
					provide: NgControl,
					useValue: new FormControl(),
				},
			],
		});
		fixture = TestBed.createComponent(TemperatureInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when canSetMoreValue is called', () => {
		it('without maximum it should return true', () => {
			// arrange
			component.max = undefined;
			// act
			const result = component.canSetMoreValue();
			// assert
			expect(result).toBeTrue();
		});

		it('without value it should return true', () => {
			// arrange
			component.value = undefined;
			// act
			const result = component.canSetMoreValue();
			// assert
			expect(result).toBeTrue();
		});

		it('with les value than maximum it should return true', () => {
			// arrange
			component.value = 20;
			component.max = 50;

			// act
			const result = component.canSetMoreValue();
			// assert
			expect(result).toBeTrue();
		});

		it('with same value than maximum it should return false', () => {
			// arrange
			component.value = 50;
			component.max = 50;

			// act
			const result = component.canSetMoreValue();
			// assert
			expect(result).toBeFalse();
		});

		it('with more value than maximum it should return false', () => {
			// arrange
			component.value = 80;
			component.max = 50;

			// act
			const result = component.canSetMoreValue();
			// assert
			expect(result).toBeFalse();
		});
	});

	describe('when setMoreValue is called', () => {
		it('with valid value it should increase value', () => {
			// arrange
			component.value = 10;
			component.max = 20;

			// act
			component.setMoreValue();

			// assert
			expect(component.value).toEqual(11);
		});

		it('with invalid value it should not modify the value', () => {
			// arrange
			component.value = 10;
			component.max = 10;

			// act
			component.setMoreValue();

			// assert
			expect(component.value).toEqual(10);
		});
	});

	describe('when canSetLessValue is called', () => {
		it('without minimum it should return true', () => {
			// arrange
			component.min = undefined;
			// act
			const result = component.canSetLessValue();
			// assert
			expect(result).toBeTrue();
		});

		it('without value it should return true', () => {
			// arrange
			component.value = undefined;
			// act
			const result = component.canSetLessValue();
			// assert
			expect(result).toBeTrue();
		});

		it('with more value than minimum it should return true', () => {
			// arrange
			component.value = 30;
			component.min = 20;

			// act
			const result = component.canSetLessValue();
			// assert
			expect(result).toBeTrue();
		});

		it('with same value than minimum it should return false', () => {
			// arrange
			component.value = 50;
			component.min = 50;

			// act
			const result = component.canSetLessValue();
			// assert
			expect(result).toBeFalse();
		});

		it('with less value than minimum it should return false', () => {
			// arrange
			component.value = 10;
			component.min = 20;

			// act
			const result = component.canSetLessValue();
			// assert
			expect(result).toBeFalse();
		});
	});

	describe('when setLessValue is called', () => {
		it('with valid value it should deduct value', () => {
			// arrange
			component.value = 10;
			component.min = 0;

			// act
			component.setLessValue();

			// assert
			expect(component.value).toEqual(9);
		});

		it('with invalid value it should not modify the value', () => {
			// arrange
			component.value = 10;
			component.min = 10;

			// act
			component.setLessValue();

			// assert
			expect(component.value).toEqual(10);
		});
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
