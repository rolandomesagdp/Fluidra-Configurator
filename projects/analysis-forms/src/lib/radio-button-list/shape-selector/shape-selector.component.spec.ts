import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	ControlContainer,
	Form,
	FormBuilder,
	FormControl,
	NgControl,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PoolCharacteristicsFormManager } from '../../pool';

import {
	ShapeSelectorComponent,
	ShapeSelectorModule,
} from './shape-selector.component';

describe('ShapeSelectorComponent', () => {
	let component: ShapeSelectorComponent;
	let fixture: ComponentFixture<ShapeSelectorComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ShapeSelectorComponent],
			imports: [ShapeSelectorModule, TranslateModule.forRoot()],
			providers: [
				{
					provide: NgControl,
					useValue: new FormControl(),
				},
			],
		});
		fixture = TestBed.createComponent(ShapeSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.value = undefined;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update value', () => {
		component.value = 'custom';
		expect(component.formValue).toBe('custom');
	});

	it('should call onChange when update value', () => {
		const onChangeSpy = spyOn<any>(component, 'onChange');
		component.value = 'random1231';
		expect(onChangeSpy).toHaveBeenCalled();
	});
});
