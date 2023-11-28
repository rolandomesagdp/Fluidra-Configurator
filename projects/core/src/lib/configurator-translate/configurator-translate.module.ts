import {
	APP_INITIALIZER,
	LOCALE_ID,
	ModuleWithProviders,
	NgModule,
} from '@angular/core';
import {
	MissingTranslationHandler,
	TranslateLoader,
	TranslateModule,
	USE_DEFAULT_LANG,
	DEFAULT_LANGUAGE,
	USE_STORE,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from './http-loader.factory';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LanguageService } from './language.service';
import { CommonModule } from '@angular/common';
import { ConfiguratorMissingTranslationHandler } from './configurator-missing-translation.handler';

const locale = (languageService: LanguageService) =>
	languageService.getCurrentLocale();

const defLang = (languageService: LanguageService) =>
	languageService.defaultLanguage?.value;

const initializeTranslate = (languageService: LanguageService) => {
	return () => languageService.startup();
};
@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule.forRoot({
			missingTranslationHandler: {
				provide: MissingTranslationHandler,
				useClass: ConfiguratorMissingTranslationHandler,
			},
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory.create,
				deps: [HttpClient],
			},
		}),
	],
	exports: [TranslateModule],
	providers: [
		{ provide: LOCALE_ID, useFactory: locale, deps: [LanguageService] },
		{
			provide: APP_INITIALIZER,
			useFactory: initializeTranslate,
			multi: true,
			deps: [LanguageService],
		},
	],
})
export class ConfiguratorTranslateModule {
	static forRoot(options?: {
		useDefaultLang: boolean;
	}): ModuleWithProviders<ConfiguratorTranslateModule> {
		return {
			ngModule: ConfiguratorTranslateModule,
			providers: [
				{
					provide: USE_DEFAULT_LANG,
					useValue: options?.useDefaultLang,
				},
				...(options?.useDefaultLang
					? [
							{
								provide: DEFAULT_LANGUAGE,
								useValue: 'en',
								// useFactory: defLang,
								// deps: [LanguageService],
							},
					  ]
					: [
							{
								provide: DEFAULT_LANGUAGE,
								useValue: 'es',
							},
							{
								provide: USE_STORE,
								useValue: false,
							},
					  ]),
			],
		};
	}
}
