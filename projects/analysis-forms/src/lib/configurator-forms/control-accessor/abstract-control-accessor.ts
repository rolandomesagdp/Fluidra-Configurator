import {
	Directive,
	Injector,
	Input,
	Output,
	EventEmitter,
	OnInit,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export abstract class AbstractValueAccessor<ValueInterface = any>
	implements ControlValueAccessor, OnInit
{
	@Input()
	public formValue: ValueInterface = null;

	@Output()
	public changed: EventEmitter<ValueInterface> = new EventEmitter();
	public touched: EventEmitter<void> = new EventEmitter();

	protected ngControl: NgControl;

	constructor(protected injector?: Injector) {
		this.value = this.formValue;
	}

	ngOnInit() {
		try {
			this.ngControl = this.injector.get(NgControl);
		} catch (e) {
			console.error('Error on inject ngControl');
		}
	}

	get value(): ValueInterface {
		return this.formValue;
	}

	set value(val: ValueInterface) {
		if (val !== this.formValue) {
			this.formValue = val;
			this.onChange(val);
		}
	}

	writeValue(value: ValueInterface) {
		this.formValue = value;
		this.onChange(value);
	}

	@Output()
	onInput(event: Event) {
		this.onTouched(event);
		this.onChange(this.value, event);
	}

	@Output()
	onChange = (value?: ValueInterface, event?: Event | any) => {
		// console.log('On Change', value, event);
		this.changed.emit(value);
		this.formOnChange(value, event);
	};

	private formOnChange = (value?: ValueInterface, event?: Event | any) => {};

	@Output()
	onTouched = (event?: Event) => {
		this.touched.emit();
		this.formOnTouched(event);
	};

	private formOnTouched = (event?: Event) => {};

	registerOnChange(fn: (value?: ValueInterface, event?: Event) => void): void {
		// console.log(' register On Change', event);
		this.formOnChange = fn;
	}

	registerOnTouched(fn: (event?: Event) => void): void {
		this.formOnTouched = fn;
	}

	hasErrors() {
		return this.ngControl
			? (this.ngControl?.touched || this.ngControl?.dirty) &&
					this.ngControl?.invalid
			: false;
	}

	isDisabled() {
		return this.ngControl ? this.ngControl?.disabled : false;
	}
}
