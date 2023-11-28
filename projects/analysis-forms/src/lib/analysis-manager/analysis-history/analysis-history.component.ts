import { Observable } from 'rxjs';
import { Component, EventEmitter, Output } from '@angular/core';
import { AnalysisService, PoolGeneralInfo } from 'configurator-core';

@Component({
	selector: 'fcc-analysis-history',
	templateUrl: './analysis-history.component.html',
	styleUrls: ['./analysis-history.component.scss'],
})
export class AnalysisHistoryComponent {
   @Output() onSeeAllClicked: EventEmitter<void> = new EventEmitter<void>();

	public lastAnalyses$: Observable<PoolGeneralInfo[]> = this.analysisService
		.getLastAnalyses();

	constructor(private analysisService: AnalysisService) { }

   onSeeAllAnalysisClicked(): void {
      this.onSeeAllClicked.emit()
   }
}
