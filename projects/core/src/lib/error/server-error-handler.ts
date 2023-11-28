import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class ServerErrorHandler {
	constructor() {}

	// Here we are supposed to trace errors
	handleError(error: any, message: string): Observable<never> {
		const errorMessage: string = this.buildErrorMessage(error, message);
		return throwError(() => new Error(errorMessage));
	}

	private buildErrorMessage(error: any, baseMessage: string): string {
		if (error instanceof HttpErrorResponse) {
			return `${baseMessage}. Details: ${error.message}`;
		}
		if (error.error && error.error instanceof ErrorEvent) {
			return `${baseMessage} Details: ${error.error}`;
		}
		return baseMessage;
	}
}
