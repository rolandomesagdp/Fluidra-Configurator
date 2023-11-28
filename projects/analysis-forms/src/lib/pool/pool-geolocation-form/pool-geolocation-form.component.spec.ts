import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	ControlContainer,
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { YesNoQuestionModule } from '../../radio-button-list/yes-no-question';

import { PoolGeolocationFormComponent } from './pool-geolocation-form.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('PoolGeolocationFormManager', () => {
	let component: PoolGeolocationFormComponent;
	let fixture: ComponentFixture<PoolGeolocationFormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PoolGeolocationFormComponent],
			imports: [
				ReactiveFormsModule,
				FormsModule,
				YesNoQuestionModule,
				TranslateModule.forRoot(),
				MatDialogModule,
			],
			providers: [
				{
					provide: ControlContainer,
				},
			],
		});

		fixture = TestBed.createComponent(PoolGeolocationFormComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
