import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisService } from './analysis.service';
import { HttpClientModule } from '@angular/common/http';
import {
	PoolAssistantClientEndpoint,
	PoolAssistantClientModuleOptions,
	POOL_ASSISTANCE_CLIENT_OPTIONS_TOKEN,
	PoolAssistantClientEndpointFactory,
} from './pool-assistant-client-settings';
import { UserService } from './user';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
	providers: [UserService, AnalysisService],
})
export class PoolAssistantClientModule {
	static forRoot(
		options?: PoolAssistantClientModuleOptions
	): ModuleWithProviders<PoolAssistantClientModule> {
		return {
			ngModule: PoolAssistantClientModule,
			providers: [
				{
					provide: POOL_ASSISTANCE_CLIENT_OPTIONS_TOKEN,
					useValue: options,
				},
				{
					provide: PoolAssistantClientEndpoint,
					useFactory: PoolAssistantClientEndpointFactory,
					deps: [POOL_ASSISTANCE_CLIENT_OPTIONS_TOKEN],
				},
			],
		};
	}
}
