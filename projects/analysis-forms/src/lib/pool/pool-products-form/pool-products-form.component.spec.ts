import { TranslateModule } from '@ngx-translate/core';
import {
	ControlContainer,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolProductsFormComponent } from './pool-products-form.component';

describe('PoolProductsFormComponent', () => {
	let component: PoolProductsFormComponent;
	let fixture: ComponentFixture<PoolProductsFormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PoolProductsFormComponent],
			imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot()],
			providers: [
				{
					provide: ControlContainer,
				},
			],
		});
		fixture = TestBed.createComponent(PoolProductsFormComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
