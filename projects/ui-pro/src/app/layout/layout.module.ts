import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from './footer';
import { ToolbarModule } from './toolbar/toolbar.module';
import { LogoModule } from './logo/logo.module';
import { LanguageSelectorModule } from './language-selector';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      FooterModule,
      ToolbarModule,
      LogoModule,
      LanguageSelectorModule
   ],
   exports: [
      FooterModule,
      ToolbarModule,
      LogoModule,
      LanguageSelectorModule
   ]
})
export class LayoutModule { }
