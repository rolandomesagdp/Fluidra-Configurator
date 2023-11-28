import { InjectionToken } from '@angular/core';
import { BackOfficeClientEndpoint } from './back-office-client-endpoint';

export interface BackOfficeClientModuleOptions {
	baseUrl?: string;
}

export var BACK_OFFICE_CLIENT_OPTIONS_TOKEN =
	new InjectionToken<BackOfficeClientModuleOptions>(
		'forRoot() BackOfficeClient configuration.'
	);

export function BackOfficeClientEndpointFactory(
	options?: BackOfficeClientModuleOptions
): BackOfficeClientEndpoint {
	let endpoint = new BackOfficeClientEndpoint();
	if (options) {
		if (typeof options.baseUrl === 'string') {
			endpoint.baseUrl = options.baseUrl;
		}
	}

	return endpoint;
}
