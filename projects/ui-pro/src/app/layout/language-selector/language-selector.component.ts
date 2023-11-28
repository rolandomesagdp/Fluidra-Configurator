import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ConfiguratorTranslateSharedModule, LanguageService } from 'configurator-core';


@Component({
   selector: 'fcp-language-selector',
   templateUrl: './language-selector.component.html',
   styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

   constructor(public language: LanguageService) { }

}

@NgModule({
   declarations: [ LanguageSelectorComponent ],
   imports: [
      CommonModule,
      MatIconModule,
      MatSelectModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      ConfiguratorTranslateSharedModule
   ],
   exports: [ LanguageSelectorComponent ]
})
export class LanguageSelectorModule { }