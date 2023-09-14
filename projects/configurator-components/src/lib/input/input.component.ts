import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
   selector: 'fcc-input',
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: InputComponent }
   ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
   @Input() inputType: string = "text";
   @Input() label: string = "";
   inputValue: FormControl = new FormControl("");
   onChange = (newValue: any) => { };
   onTouched = () => { };
   touched = false;
   disabled = false;

   ngOnInit(): void {
      this.inputValue.valueChanges.subscribe(newValue => {
         this.onChange(newValue)
      })
   }

   writeValue(value: any): void {
      this.inputValue.setValue(value);
      this.onChange(this.inputValue.value)
   }

   registerOnChange(onChangeFn: any): void {
      this.onChange = onChangeFn;
   }

   registerOnTouched(onTouchedFn: any): void {
      this.onTouched = onTouchedFn;
   }

   setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }
}
@NgModule({
   declarations: [
      InputComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule
   ],
   exports: [InputComponent]
})
export class InputModule { }
