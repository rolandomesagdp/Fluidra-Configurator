import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContainerModule } from './form-container';
import { TitleModule } from './title/title.component';
import { FormControlContainerModule } from './form-control-container';

@NgModule({
   imports: [
      CommonModule,
      FormContainerModule,
      FormControlContainerModule,
      TitleModule
   ],
   exports: [
      FormContainerModule,
      TitleModule,
      FormControlContainerModule
   ]
})
export class ConfiguratorFormsModule { }
