import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent, SpinnerModule } from './spinner.component';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SpinnerComponent],
			imports: [SpinnerModule],
		});
		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
