import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
	BackOfficeClientEndpoint,
	BackOfficeClientModuleOptions,
	BACK_OFFICE_CLIENT_OPTIONS_TOKEN,
	BackOfficeClientEndpointFactory,
} from './back-office-client-settings';
import { TariffService } from './tariff';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
	providers: [TariffService],
})
export class BackOfficeClientModule {
	static forRoot(
		options?: BackOfficeClientModuleOptions
	): ModuleWithProviders<BackOfficeClientModule> {
		return {
			ngModule: BackOfficeClientModule,
			providers: [
				{
					provide: BACK_OFFICE_CLIENT_OPTIONS_TOKEN,
					useValue: options,
				},
				{
					provide: BackOfficeClientEndpoint,
					useFactory: BackOfficeClientEndpointFactory,
					deps: [BACK_OFFICE_CLIENT_OPTIONS_TOKEN],
				},
			],
		};
	}
}
