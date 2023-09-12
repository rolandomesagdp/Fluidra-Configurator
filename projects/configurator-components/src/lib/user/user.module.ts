import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormGroupComponent } from './user-form-group/user-form-group.component';



@NgModule({
  declarations: [
    UserFormGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
   UserFormGroupComponent
  ]
})
export class UserModule { }
