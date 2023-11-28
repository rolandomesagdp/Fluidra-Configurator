import { InjectionToken } from '@angular/core';
import { PoolAssistantClientEndpoint } from './pool-assistant-client-endpoint';

export interface PoolAssistantClientModuleOptions {
	baseUrl?: string;
}

export var POOL_ASSISTANCE_CLIENT_OPTIONS_TOKEN =
	new InjectionToken<PoolAssistantClientModuleOptions>(
		'forRoot() PoolAssistantClient configuration.'
	);

export function PoolAssistantClientEndpointFactory(
	options?: PoolAssistantClientModuleOptions
): PoolAssistantClientEndpoint {
	let endpoint = new PoolAssistantClientEndpoint();
	if (options) {
		if (typeof options.baseUrl === 'string') {
			endpoint.baseUrl = options.baseUrl;
		}
	}

	return endpoint;
}
