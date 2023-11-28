import { TranslateModule } from '@ngx-translate/core';
import {
	ControlContainer,
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
	PoolHeatingSolutionsFormComponent,
	PoolHeatingSolutionsFormModule,
} from './pool-heating-solutions-form.component';

describe('PoolHeatingSolutionsFormComponent', () => {
	let component: PoolHeatingSolutionsFormComponent;
	let fixture: ComponentFixture<PoolHeatingSolutionsFormComponent>;
	const formBuilder = new FormBuilder();

	let poolHeatingSolutions = formBuilder.group({
		heatPump: [true],
		heatingBrand: [null],
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PoolHeatingSolutionsFormComponent],
			imports: [
				ReactiveFormsModule,
				FormsModule,
				TranslateModule.forRoot(),
				PoolHeatingSolutionsFormModule,
			],
			providers: [
				{
					provide: ControlContainer,
				},
			],
		});
		fixture = TestBed.createComponent(PoolHeatingSolutionsFormComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		component.poolHeatingSolutionsForm = poolHeatingSolutions;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should need show error', () => {
		const control = formBuilder.control(null);
		const result = component.needShowError(control);
		expect(result).toBe(false);
	});

	it('should need show error with key', () => {
		const control = formBuilder.control(null);
		const result = component.needShowError(control, 'required');
		expect(result).toBe(false);
	});

	it('should createUniqueBrandList after set a productList', () => {
		component.productList = [
			{
				brand: 'Zodiac',
				name: 'Zodiac Z200',
				price: 2000,
				type: 'heatPump',
			},
			{
				brand: 'Zodiac',
				name: 'Zodiac Z300',
				price: 3000,
				type: 'heatPump',
			},
			{
				brand: 'AstralPool',
				name: 'AstralPool 200',
				price: 2500,
				type: 'heatPump',
			},
		];
		expect(component.brands).toEqual(['Zodiac', 'AstralPool']);
	});

	it('should createUniqueBrandList after set a productList with heatPump', () => {
		component.poolHeatingSolutionsForm = poolHeatingSolutions;
		component.productList = [
			{
				brand: 'Zodiac',
				name: 'Zodiac Z200',
				price: 2000,
				type: 'heatPump',
			},
			{
				brand: 'Zodiac',
				name: 'Zodiac Z300',
				price: 3000,
				type: 'heatPump',
			},
			{
				brand: 'AstralPool',
				name: 'AstralPool 200',
				price: 2500,
				type: 'heatPump',
			},
		];
		expect(component.brands).toEqual(['Zodiac', 'AstralPool']);
	});
});
