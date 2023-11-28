import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { YesNoQuestionComponent } from './yes-no-question.component';
import { NgControl, FormControl } from '@angular/forms';

describe('YesNoQuestionComponent', () => {
	let component: YesNoQuestionComponent;
	let fixture: ComponentFixture<YesNoQuestionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [YesNoQuestionComponent],
			imports: [TranslateModule.forRoot()],
			providers: [
				{
					provide: NgControl,
					useValue: new FormControl(),
				},
			],
		});
		fixture = TestBed.createComponent(YesNoQuestionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update value', () => {
		const value = false;
		component.updateValue(value);
		expect(component.value).toBe(value);
	});

	it('should call onChange when updateValue is called', () => {
		const onChangeSpy = spyOn<any>(component, 'onChange');
		component.value = true;
		expect(onChangeSpy).toHaveBeenCalled();
	});
});
