import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormGroupComponent } from './address-form-group/address-form-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputModule } from '../input';

@NgModule({
  declarations: [
   AddressFormGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    MatInputModule,
  ],
  exports: [ AddressFormGroupComponent ]
})
export class AddressModule { }
