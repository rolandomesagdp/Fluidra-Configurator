import { Injectable } from '@angular/core';
import { Pool } from 'configurator-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnalysisEvent } from './analysis-event.interface';
import { AnalysisActionType } from './analysis-action-type.enum';

@Injectable({
	providedIn: 'root',
})
export class AnalysisEventEmitter {
	private analysisActionSubject$: BehaviorSubject<AnalysisEvent> =
		new BehaviorSubject<AnalysisEvent>(null);

	public analysisActionEvent$: Observable<AnalysisEvent> =
		this.analysisActionSubject$.asObservable();

	public deleteAnalysis(analysis: Pool): void {
		this.analysisActionSubject$.next({
			analysis: analysis,
			action: AnalysisActionType.deleteAnalysis,
		});
	}

	public duplicateAnalysis(analysis: Pool): void {
		this.analysisActionSubject$.next({
			analysis: analysis,
			action: AnalysisActionType.duplicateAnalysis,
		});
	}
}
