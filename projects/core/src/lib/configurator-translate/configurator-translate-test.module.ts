import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './http-loader.factory';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      HttpClientModule,
      TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory.create,
				deps: [HttpClient],
			},
			defaultLanguage: 'en',
		})
   ],
   providers: [ TranslateService ]
})
export class ConfiguratorTranslateTestModule { }
