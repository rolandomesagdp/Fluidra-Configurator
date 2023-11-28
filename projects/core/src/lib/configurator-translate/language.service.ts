import { FormControl } from '@angular/forms';
import {
	MissingTranslationHandler,
	MissingTranslationHandlerParams,
	TranslateService,
} from '@ngx-translate/core';

import { availableLanguages } from './available-language-options';
import { LanguageOption } from './language-option';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LanguageService {
	languageControl: FormControl = new FormControl('');

	get availableLanguages(): LanguageOption[] {
		return availableLanguages;
	}

	get defaultLanguage(): LanguageOption {
		return availableLanguages.find((x) => x.value === 'en');
	}

	get currentLanguage(): LanguageOption {
		return availableLanguages.find(
			(x) => x.value === this.translateService.currentLang
		);
	}

	constructor(private translateService: TranslateService) {}

	startup(): void {
		this.subscribeToLanguageChange();
		this.languageControl.setValue(this.defaultLanguage.value);
	}

	changeLanguage(): void {
		const currentSelection: string = this.languageControl.value;
		this.translateService.use(currentSelection);
	}

	private subscribeToLanguageChange(): void {
		this.languageControl.valueChanges.subscribe(() => {
			this.changeLanguage();
		});
	}

	public getCurrentLocale() {
		return this.currentLanguage?.value || this.defaultLanguage?.value;
	}
}
