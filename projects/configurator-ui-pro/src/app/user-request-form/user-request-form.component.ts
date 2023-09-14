import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserRequest } from './user-request';
import { UserRequestFormBuilder } from './user-request-form-builder';
import { AddressModule, InputModule, UserModule } from 'configurator-components';

@Component({
  selector: 'fcp-user-request-form',
  templateUrl: './user-request-form.component.html',
  styleUrls: ['./user-request-form.component.scss']
})
export class UserRequestFormComponent {
   private userRequestformBuilder: UserRequestFormBuilder;
   @Input() userRequest: UserRequest | null = null;
   userRequestForm: FormGroup;

   constructor(formBuilder: FormBuilder) {
      this.userRequestformBuilder = new UserRequestFormBuilder(formBuilder);
      this.userRequestForm = this.userRequestformBuilder.emptyForm;
   }

   onSubmit(): void {
      console.log(this.userRequestForm.value);
   }
}
@NgModule({
   declarations: [
      UserRequestFormComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule,
      UserModule,
      AddressModule,
      InputModule
   ],
   exports: [
      UserRequestFormComponent
   ]
 })
 export class UserRequestFormModule { }
