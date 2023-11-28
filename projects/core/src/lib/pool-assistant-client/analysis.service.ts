import { Injectable } from '@angular/core';
import { PoolAssistantClientEndpoint } from './pool-assistant-client-settings/pool-assistant-client-endpoint';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, delay, of, tap, throwError } from 'rxjs';
import { PoolGeneralInfo } from './pool/pool-general-info.interface';
import { ServerErrorHandler } from '../error/server-error-handler';
import { Months, Pool } from './pool';
import { Product } from './product';
import { AnalysisFilters, AnalysisHttpParamsFactory } from './filters';

@Injectable()
export class AnalysisService extends ServerErrorHandler {
	private baseUrl: string;

	constructor(
		endpoint: PoolAssistantClientEndpoint,
		private httpClient: HttpClient
	) {
		super();
		this.baseUrl = endpoint.baseUrl;
	}

	savePoolGeneralCharacteristics(
		generalInfo: PoolGeneralInfo
	): Observable<PoolGeneralInfo> {
		return of({ id: 1, ...generalInfo }).pipe(
			delay(2500),
			catchError((error: Error) => {
				const localMessage: string =
					'Pool general information could not be saved';
				return this.handleError(error, localMessage);
			})
		);
	}

	savePoolCharacteristics(pool: Pool): Observable<Pool> {
		return of(pool as Pool).pipe(
			delay(2500),
			catchError((error: Error) => {
				const localMessage: string = 'Pool characteristics could not be saved';
				return this.handleError(error, localMessage);
			})
		);
	}

	getAll(callNumber: number, filters?: AnalysisFilters): Observable<Pool[]> {
      const params: HttpParams = filters ? 
         new AnalysisHttpParamsFactory(filters).create() : 
         new HttpParams();

      const url = `${this.baseUrl}/all-analysis-page-${callNumber}.json`
		return this.httpClient.get<Pool[]>(url, { params: params }).pipe(
         delay(1500)
      );
	}

	getPoolById(id: number): Observable<Pool> {
		return of({
			id: 1,
			name: 'Pool 1',
			email: 'email@email.com',
			phone: '123456789',
			countryCode: 'ES',
			customerName: 'Customer Name',
			characteristics: {
				hasCover: null,
				shelter: null,
				shape: null,
				ground: null,
				place: null,
				type: null,
				heated: null,
				dimension: null,
			},
			geolocation: {
				altitude: 50,
				climateZone: null,
				countryCode: null,
				latitude: null,
				locality: null,
				longitude: null,
				wind: 'medium',
				zipCode: null,
			},
			usage: {
				periodOfUseMonths: [
					Months.May,
					Months.June,
					Months.July,
					Months.August,
					Months.September,
				],
				currentWaterTemperature: 15,
				targetWaterTemperature: 26,
				poolFiltrationTime: 13,
			},
			productsAndBrands: {
				heating: null,
				heatingBrand: null,
			},
			heatingSolutions: {
				heatPump: null,
				heatPumpInTechnicalRoom: null,
			},
		} as Pool).pipe(delay(1700));
	}

	getLastAnalyses(): Observable<PoolGeneralInfo[]> {
		return of([
			{
				id: 1,
				name: "Mark's club indoor pool",
				customerName: 'Mark Zumben',
				email: 'mark.zumben@example.com',
				phone: '+44645784578',
				countryCode: 'uk',
				date: '01/08/2023',
				draft: true,
				professional: 4,
			},
			{
				id: 2,
				name: "Mark's club indoor pool",
				customerName: 'Mark Zumben',
				email: 'mark.zumben@example.com',
				phone: '+44645784578',
				countryCode: 'uk',
				date: '01/08/2023',
				draft: false,
				professional: 4,
			},
			{
				id: 3,
				name: "Mark's club indoor pool",
				customerName: 'Mark Zumben',
				email: 'mark.zumben@example.com',
				phone: '+44645784578',
				countryCode: 'uk',
				date: '01/08/2023',
				draft: false,
				professional: 4,
			},
		]).pipe(
			delay(1800),
			catchError((error: Error) => {
				const localMessage: string =
					'Pools general information could not be listed';
				return this.handleError(error, localMessage);
			})
		);
	}

	duplicateAnalysis(analysis: Pool): Observable<Pool> {
		return of(analysis).pipe(
			tap((analysis: Pool) => console.log('Duplicating analysis')),
			delay(1800),
			catchError((error: Error) =>
				this.handleError(error, 'Pools could not be duplicated')
			)
		);
	}

	deleteAnalysis(analysis: Pool): Observable<number> {
		return of(analysis.id).pipe(
			tap((analysisId: number) => console.log('Deleting analysis')),
			delay(1800),
			catchError((error: Error) =>
				this.handleError(error, 'Pools could not be deleted')
			)
		);
	}

	getAnalysisResult(analysisId: number): Observable<Product[]> {
		return of([
			{
				brand: 'Zodiac',
				name: 'Zodiac Z200',
				price: 2000,
				type: 'heatPump',
			},
			{
				brand: 'Zodiac',
				name: 'Zodiac Z300',
				price: 3000,
				type: 'electricHeater',
			},
			{
				brand: 'AstralPool',
				name: 'AstralPool 200',
				price: 2500,
				type: 'electricHeater',
			},
		] as Product[]).pipe(
			delay(1800),
			catchError((error: Error) =>
				this.handleError(error, 'Analysis result could not be retrieved')
			)
		);
	}

	private testingError(parameter: any): Observable<any> {
		return throwError(() => new HttpErrorResponse({ status: 404 }));
	}
}
