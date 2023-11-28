import {
	autoSpy,
	BackOfficeClientEndpoint,
	PoolAssistantClientEndpoint,
	SpyOf,
	UserService,
} from 'configurator-core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	ControlContainer,
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { YesNoQuestionModule } from '../../radio-button-list/yes-no-question';

import { PoolCharacteristicsFormComponent } from './pool-characteristics-form.component';
import { PoolCharacteristicsFormModule } from './pool-characteristics-form.module';

describe('PoolCharacteristicsFormComponent', () => {
	let component: PoolCharacteristicsFormComponent;
	let fixture: ComponentFixture<PoolCharacteristicsFormComponent>;
	const formBuilder = new FormBuilder();
	const userService: SpyOf<UserService> = autoSpy(UserService);

	let controlContainerForm = formBuilder.group({
		poolCharacteristics: formBuilder.group({
			place: [null],
			ground: [null],
			hasCover: [null],
			shelter: [null],
			shape: [null],
			type: [null],
			heated: [null],
			dimension: formBuilder.group({
				length: [null],
				width: [null],
				depth: [null],
				diameter: [null],
				surface: [null],
				volume: [null],
			}),
		}),
	});

	beforeEach(() => {
		userService.currentUser = {
			id: 1,
			name: 'Test',
			isAdmin: true,
			countryCode: 'EN',
		};
		TestBed.configureTestingModule({
			declarations: [PoolCharacteristicsFormComponent],
			imports: [
				ReactiveFormsModule,
				FormsModule,
				YesNoQuestionModule,
				TranslateModule.forRoot(),
				PoolCharacteristicsFormModule,
			],
			providers: [
				{
					provide: ControlContainer,
					useValue: controlContainerForm,
				},
				FormBuilder,
				{
					provide: BackOfficeClientEndpoint,
					useValue: {
						baseUrl: 'http://localhost:4200',
					},
				},
				{
					provide: PoolAssistantClientEndpoint,
					useValue: {
						baseUrl: 'http://localhost:4200',
					},
				},
				{ provide: UserService, useValue: userService },
			],
		});

		fixture = TestBed.createComponent(PoolCharacteristicsFormComponent);
		component = fixture.componentInstance;

		component.ngOnInit();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	describe('should get Show Remember Message', () => {
		it('not show it with hasCover and shelter', () => {
			component.poolCharacteristicsForm = formBuilder.group({
				hasCover: [true],
				shelter: [true],
			});
			component.showRememberMessage = true;
			const result = component.getShowRememberMessage;
			expect(result).toBe(false);
		});

		it('show it without hasCover and shelter', () => {
			component.poolCharacteristicsForm = formBuilder.group({
				hasCover: [false],
				shelter: [false],
			});
			component.showRememberMessage = true;
			const result = component.getShowRememberMessage;
			expect(result).toBe(true);
		});

		it('not show it without hasCover and with shelter', () => {
			component.poolCharacteristicsForm = formBuilder.group({
				hasCover: [false],
				shelter: [true],
			});
			component.showRememberMessage = true;
			const result = component.getShowRememberMessage;
			expect(result).toBe(false);
		});
	});

	it('should get hasCover error', () => {
		component.poolCharacteristicsForm = formBuilder.group({
			hasCover: [null],
		});
		component.poolCharacteristicsForm.get('hasCover').markAsTouched();
		const result = component.getHasCoverError();
		expect(result).toBe(false);
	});

	it('should get shelter error', () => {
		component.poolCharacteristicsForm = formBuilder.group({
			shelter: [null],
		});
		component.poolCharacteristicsForm.get('shelter').markAsTouched();
		const result = component.getShelterError();
		expect(result).toBe(false);
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
});
