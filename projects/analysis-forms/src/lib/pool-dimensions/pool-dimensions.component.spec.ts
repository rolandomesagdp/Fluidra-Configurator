import { CommonModule } from '@angular/common';
import { MessageModule } from './../message/message.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
	PoolDimensionsComponent,
	PoolDimensionsModule,
} from './pool-dimensions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

describe('PoolDimensionsComponent', () => {
	let component: PoolDimensionsComponent;
	let fixture: ComponentFixture<PoolDimensionsComponent>;

	beforeEach(() => {
		const formBuilder = new FormBuilder();
		const formGroupDirective = new FormGroupDirective([], []);
		formGroupDirective.form = formBuilder.group({
			dimension: formBuilder.group({
				length: [null],
				width: [null],
				depth: [null],
				diameter: [null],
				surface: [null],
				volume: [null],
			}),
		});

		TestBed.configureTestingModule({
			declarations: [PoolDimensionsComponent],
			imports: [
				TranslateModule.forRoot(),
				MessageModule,
				PoolDimensionsModule,
				BrowserAnimationsModule,
				BrowserModule,
				CommonModule,
			],
			providers: [
				FormGroupDirective,
				FormBuilder,
				{ provide: FormGroupDirective, useValue: formGroupDirective },
			],
		});

		fixture = TestBed.createComponent(PoolDimensionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have enabled the correct fields for a rectangular pool', async () => {
		component.shape = 'rectangular';
		await component.ngOnChanges();
		expect(component.poolDimensionsControl.get('length').enabled).toBe(true);
		expect(component.poolDimensionsControl.get('width').enabled).toBe(true);
		expect(component.poolDimensionsControl.get('depth').enabled).toBe(true);
		expect(component.poolDimensionsControl.get('diameter').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('surface').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('volume').enabled).toBe(false);
	});

	it('should have enabled the correct fields for a round pool', async () => {
		component.shape = 'round';
		await component.ngOnChanges();
		expect(component.poolDimensionsControl.get('length').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('width').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('depth').enabled).toBe(true);
		expect(component.poolDimensionsControl.get('diameter').enabled).toBe(true);
		expect(component.poolDimensionsControl.get('surface').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('volume').enabled).toBe(false);
	});

	it('should have enabled the correct fields for a custom pool', async () => {
		component.shape = 'custom';
		await component.ngOnChanges();
		expect(component.poolDimensionsControl.get('length').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('width').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('depth').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('diameter').enabled).toBe(false);
		expect(component.poolDimensionsControl.get('surface').enabled).toBe(true);
		expect(component.poolDimensionsControl.get('volume').enabled).toBe(true);
	});

	it('should show the correct fields for a rectangular pool', async () => {
		component.shape = 'rectangular';
		await component.ngOnChanges();
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('#length')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#width')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#depth')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#diameter')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#surface')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#volume')).toBeTruthy();
	});

	it('should show the correct fields for a round pool', async () => {
		component.shape = 'round';
		await component.ngOnChanges();
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('#length')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#width')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#depth')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#diameter')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#surface')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#volume')).toBeTruthy();
	});

	it('should show the correct fields for a custom pool', async () => {
		component.shape = 'custom';
		await component.ngOnChanges();
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('#length')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#width')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#depth')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#diameter')).toBeFalsy();
		expect(fixture.nativeElement.querySelector('#surface')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('#volume')).toBeTruthy();
	});

	it('should rectangular pool calculate the surface and volume correctly', async () => {
		component.shape = 'rectangular';
		await component.ngOnChanges();
		component.poolDimensionsControl.get('length').setValue(2);
		component.poolDimensionsControl.get('width').setValue(2);
		component.poolDimensionsControl.get('depth').setValue(2);
		component.updateSurfaceAndVolume(component.shape);
		expect(component.poolDimensionsControl.get('surface').value).toBe(4);
		expect(component.poolDimensionsControl.get('volume').value).toBe(8);
	});

	it('should round pool calculate the surface and volume correctly', async () => {
		component.shape = 'round';
		await component.ngOnChanges();
		component.poolDimensionsControl.get('diameter').setValue(2);
		component.poolDimensionsControl.get('depth').setValue(2);
		component.updateSurfaceAndVolume(component.shape);
		expect(component.poolDimensionsControl.get('surface').value).toBe(3.14);
		expect(component.poolDimensionsControl.get('volume').value).toBe(6.28);
	});

	describe('should limit press decimals', () => {
		it('should preventDefault and stopPropagation', async () => {
			const event = {
				preventDefault: jasmine.createSpy('preventDefault'),
				stopPropagation: jasmine.createSpy('stopPropagation'),
				target: {
					value: '1.123',
				},
			};
			component.limitPressDecimals(event as any as InputEvent);
			expect(event.preventDefault).toHaveBeenCalled();
			expect(event.stopPropagation).toHaveBeenCalled();
		});

		it('should not to preventDefault and stopPropagation', async () => {
			const event = {
				preventDefault: jasmine.createSpy('preventDefault'),
				stopPropagation: jasmine.createSpy('stopPropagation'),
				target: {
					value: '1.1',
				},
			};
			component.limitPressDecimals(event as any as InputEvent);
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(event.stopPropagation).not.toHaveBeenCalled();
		});
	});

	it('should limit input decimals', async () => {
		const event = {
			preventDefault: jasmine.createSpy('preventDefault'),
			stopPropagation: jasmine.createSpy('stopPropagation'),
			target: {
				value: '1.123',
			},
		};
		component.limitInputDecimals(event as any as InputEvent);
		expect(event.target['value']).toBe('1.12');
	});

	it('should throw error when shape is not valid', async () => {
		component.shape = 'custom';
		await component.ngOnChanges();
		expect(() =>
			component.updateSurfaceAndVolume(component.shape)
		).toThrowError('The provided shape is not allowed');
	});
});
