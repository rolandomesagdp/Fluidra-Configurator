import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { Observable, catchError, delay, of } from 'rxjs';
import { PoolAssistantClientEndpoint } from '../pool-assistant-client-settings';
import { HttpClient } from '@angular/common/http';
import { ServerErrorHandler } from '../../error';

@Injectable()
export class UserService extends ServerErrorHandler {
	private baseUrl: string;

	constructor(
		endpoint: PoolAssistantClientEndpoint,
		private httpClient: HttpClient
	) {
		super();
		this.baseUrl = endpoint.baseUrl;
	}

	get currentUser(): User {
		return {
			id: 4,
			name: 'Johnson Mackerison',
			isAdmin: true,
			countryCode: 'ES',
		};
	}

	getUsers(name?: string): Observable<User[]> {
		return of(
			[
				{
					id: 1,
					name: 'Mark Zumben',
					isAdmin: false,
				},
				{
					id: 2,
					name: 'Johnson Parker',
					isAdmin: false,
				},
				{
					id: 3,
					name: 'Alison Jamiro',
					isAdmin: false,
				},
			].filter(
				(user) => !name || user.name.toLowerCase().includes(name.toLowerCase())
			)
		).pipe(
			delay(1500),
			catchError((error: Error) => {
				const localMessage: string = 'Error on get profesional users';
				return this.handleError(error, localMessage);
			})
		);
	}
}
