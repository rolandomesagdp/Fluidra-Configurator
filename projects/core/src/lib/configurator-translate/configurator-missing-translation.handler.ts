import {
	MissingTranslationHandler,
	MissingTranslationHandlerParams,
} from '@ngx-translate/core';

export class ConfiguratorMissingTranslationHandler
	implements MissingTranslationHandler
{
	handle(params: MissingTranslationHandlerParams) {
        console.error(`No  ${params.translateService.currentLang} translation found for ${params.key}`);
		return `[MISSING] ${params.key}`;
	}
}
