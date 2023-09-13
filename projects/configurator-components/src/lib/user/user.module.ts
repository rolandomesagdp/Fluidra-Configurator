import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { UserFormGroupComponent } from './user-form-group/user-form-group.component';

@NgModule({
  declarations: [
    UserFormGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
   UserFormGroupComponent
  ]
})
export class UserModule { }
