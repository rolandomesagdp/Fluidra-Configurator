import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
   selector: 'fcc-user-form-group',
   templateUrl: './user-form-group.component.html',
   styleUrls: ['./user-form-group.component.css']
})
export class UserFormGroupComponent implements OnInit {
   userFormGroup: FormGroup = new FormGroup({});

   addressFormGroup: FormGroup = new FormGroup({});

   constructor(private userFormContainer: ControlContainer, private formBuilder: FormBuilder) { }

   ngOnInit(): void {
      this.userFormGroup = this.userFormContainer.control as FormGroup;
      this.addressFormGroup = this.userFormGroup.get("address") as FormGroup;
   }
}
