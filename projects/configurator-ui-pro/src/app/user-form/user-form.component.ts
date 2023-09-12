import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { UserModule } from 'configurator-components';

@Component({
  selector: 'fcp-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

}
@NgModule({
   declarations: [
     UserFormComponent
   ],
   imports: [
     CommonModule,
     UserModule
   ],
   exports: [
    UserFormComponent
   ]
 })
 export class UserFormModule { }
