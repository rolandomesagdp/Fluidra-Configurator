import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
	CheckboxGroupComponent,
	CheckboxGroupModule,
} from './checkbox-group.component';

describe('CheckboxGroupComponent', () => {
	let component: CheckboxGroupComponent;
	let fixture: ComponentFixture<CheckboxGroupComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CheckboxGroupComponent],
			imports: [CheckboxGroupModule, TranslateModule.forRoot()],
			providers: [
				{
					provide: NgControl,
					useValue: new FormControl(),
				},
			],
		});
		fixture = TestBed.createComponent(CheckboxGroupComponent);
		component = fixture.componentInstance;
		component.options = [
			{ key: 'test', label: 'test' },
			{ key: 'test2', label: 'test2' },
		];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update the value', () => {
		component.value = [];
		component.updateValue('test');
		expect(component.value).toEqual(['test']);
	});

	it('should update the value with all values', () => {
		component.value = ['test'];
		component.updateValue('test2');
		expect(component.value).toEqual(['test', 'test2']);
	});

	it('should deselect the value', () => {
		component.value = ['test'];
		component.updateValue('test');
		expect(component.value).toEqual([]);
	});

	it('should check if the value is checked', () => {
		component.value = ['test'];
		expect(component.isChecked('test')).toBeTruthy();
	});

	it('should select all', () => {
		component.value = [];
		component.selectAllValue = true;
		component.selectDeselectAll();
		expect(component.value).toEqual(['test', 'test2']);
	});

	it('should deselect all', () => {
		component.value = ['test', 'test2'];
		component.selectAllValue = false;
		component.selectDeselectAll();
		expect(component.value).toEqual([]);
	});
});
