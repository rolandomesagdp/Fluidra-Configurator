import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { BackOfficeClientEndpoint } from '../back-office-client-settings';
import { ServerErrorHandler } from '../../error';

@Injectable()
export class TariffService extends ServerErrorHandler {
	private baseUrl: string;

	constructor(
		endpoint: BackOfficeClientEndpoint,
		private httpClient: HttpClient
	) {
		super();
		this.baseUrl = endpoint.baseUrl;
	}

	getAnnualAverageTariff(filtrationTime: number, countryCode: string) {
		const basePricing = 0.45;
		const electricalPrice = 1.48;

		return of(filtrationTime * basePricing * electricalPrice).pipe(delay(1200));
	}
}
