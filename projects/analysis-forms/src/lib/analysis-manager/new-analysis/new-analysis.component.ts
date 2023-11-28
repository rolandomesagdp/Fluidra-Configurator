import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	Country,
	Pool,
	PoolFactory,
	User,
	UserService,
	CountryService,
} from 'configurator-core';
import { Observable, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { EmailValidator } from './email.validator';
import { PhoneValidator } from './phone.validator';

@Component({
	selector: 'fcc-new-analysis',
	templateUrl: './new-analysis.component.html',
	styleUrls: ['./new-analysis.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAnalysisComponent implements OnInit {
	@Input() professional: boolean = false;
	@Input() saving: boolean = false;
	@Output() onSubmit: EventEmitter<Pool> = new EventEmitter<Pool>();
	public newAnalysisForm: FormGroup;

	public readonly countries: Country[] =
		CountryService.getCountriesWithPhonePrefix();

	public professionals$: Observable<User[]>;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService
	) {}

	ngOnInit() {
		this.initForm();
		if (this.professional) {
			this.loadProfessionals();
		}
	}

	private initForm() {
		this.newAnalysisForm = this.formBuilder.group({
			name: ['', Validators.required],
			customerName: ['', Validators.maxLength(255)],
			email: ['', [EmailValidator, Validators.maxLength(255)]],
			countryCode: 'ES',
			phone: ['', [PhoneValidator, Validators.maxLength(255)]],
		});

		if (this.professional) {
			this.newAnalysisForm.addControl('professional', new FormControl(null));
		}
	}

	private loadProfessionals() {
		this.professionals$ = this.newAnalysisForm.controls?.[
			'professional'
		].valueChanges.pipe(
			startWith(''),
			distinctUntilChanged(),
			switchMap((value) => {
				const name = typeof value === 'string' ? value : null;
				return this.userService.getUsers(name);
			})
		);
	}

	public async submit() {
		if (this.newAnalysisForm.valid) {
			this.saving = true;
			this.newAnalysisForm.disable();
			const analysis: Pool = new PoolFactory().factoryPoolGeneralInfo(
				this.newAnalysisForm
			);
			this.onSubmit.emit(analysis);
		} else {
			this.newAnalysisForm.markAllAsTouched();
		}
	}

	/**
	 * @description checks is current user is admin
	 */
	private needShowProfesionalField(): boolean {
		return true || this.userService.currentUser?.isAdmin;
	}

	public displayProfessionalFn(user: User): string {
		return user?.name;
	}

	public hasError(
		control: FormControl | AbstractControl,
		key?: string
	): boolean {
		if (key && !control.hasError(key)) {
			return false;
		}
		return control.invalid && (control.touched || control.dirty);
	}

	public getCurrentCountry() {
		return CountryService.getCountry(
			this.newAnalysisForm?.get('countryCode')?.getRawValue()
		);
	}
}
