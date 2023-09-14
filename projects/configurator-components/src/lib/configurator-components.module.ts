import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { UserModule } from './user';
import { InputModule } from './input';

@NgModule({
  declarations: [
  ],
  imports: [
    ButtonModule,
    UserModule
  ],
  exports: [
    ButtonModule,
    InputModule,
    UserModule
  ]
})
export class ConfiguratorComponentsModule { }
