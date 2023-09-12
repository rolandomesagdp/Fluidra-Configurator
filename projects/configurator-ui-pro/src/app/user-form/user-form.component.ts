import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ConfiguratorComponentsModule } from 'configurator-components';

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
     ConfiguratorComponentsModule
   ],
   exports: [
    UserFormComponent
   ]
 })
 export class UserFormModule { }
