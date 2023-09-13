import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'fcc-user-form-group',
  templateUrl: './user-form-group.component.html',
  styleUrls: ['./user-form-group.component.css']
})
export class UserFormGroupComponent implements OnInit {
   userForm: FormGroup = new FormGroup({
      name: this.formBuilder.control(""),
      lastName: this.formBuilder.control("")
   });

   constructor(private userFormContainer: ControlContainer, private formBuilder: FormBuilder) {
      
   }

   ngOnInit(): void {
      this.userForm = this.userFormContainer.control as FormGroup;
   }
}
