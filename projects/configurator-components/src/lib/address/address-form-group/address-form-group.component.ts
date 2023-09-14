import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'fcc-address-form-group',
  templateUrl: './address-form-group.component.html',
  styleUrls: ['./address-form-group.component.scss']
})
export class AddressFormGroupComponent implements OnInit {
   addressForm: FormGroup = new FormGroup({
      street: this.formBuilder.control(""),
      number: this.formBuilder.control(""),
      zipCode: this.formBuilder.control("")
   });

   constructor(private addressFormContainer: ControlContainer, private formBuilder: FormBuilder) { }

   ngOnInit(): void {
      this.addressForm = this.addressFormContainer.control as FormGroup;
   }
}