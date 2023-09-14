import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { UserModule } from './user';
import { InputModule } from './input';
import { AddressModule } from './address';

@NgModule({
  declarations: [
  ],
  imports: [
    ButtonModule,
    UserModule,
    AddressModule
  ],
  exports: [
    ButtonModule,
    InputModule,
    UserModule,
    AddressModule
  ]
})
export class ConfiguratorComponentsModule { }
