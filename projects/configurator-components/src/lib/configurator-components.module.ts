import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { UserModule } from './user';

@NgModule({
  declarations: [
  ],
  imports: [
    ButtonModule,
    UserModule
  ],
  exports: [
    ButtonModule,
    UserModule
  ]
})
export class ConfiguratorComponentsModule { }
