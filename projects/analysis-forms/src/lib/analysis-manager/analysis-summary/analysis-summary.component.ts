import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PoolGeneralInfo, Pool, SubscriptionsManager } from 'configurator-core';
import { AnalysisQuickViewComponent } from '../analysis-quick-view/analysis-quick-view.component';
import { AnalysisQuickViewComponentData } from '../analysis-quick-view/analysis-quick-view.component.interface';
import { DialogMessageData } from '../../message/dialog-message/dialog-message-data';
import { take, tap } from 'rxjs';
import { ConfirmationResponse, DialogMessageService } from '../../message/dialog-message';
import { AnalysisEventEmitter } from '../events';

@Component({
	selector: 'fcc-analysis-summary',
	templateUrl: './analysis-summary.component.html',
	styleUrls: ['./analysis-summary.component.scss'],
})
export class AnalysisSummaryComponent {
	@Input({ required: true }) analysis: PoolGeneralInfo;

	constructor(public dialog: MatDialog, 
      public confirService: DialogMessageService,
      public summaryEvents: AnalysisEventEmitter) {}

	public duplicateAnalysis() {
		const confirmationDialogData = DialogMessageData.build(
         "Duplicate sizing", "Are you sure you want to duplicate this sizing?", true, "Yes", true, "No"
      );
      this.confirService.confirm(confirmationDialogData).pipe(
         take(1),
         tap((response: ConfirmationResponse) => {
            if(response && response === ConfirmationResponse.Accept)
               this.summaryEvents.duplicateAnalysis(this.analysis)
         })
      ).subscribe();
	}

	public deleteAnalysis() {
      const confirmationDialogData = DialogMessageData.build(
         "Delete sizing", "Are you sure you want to delete this sizing?", true, "Yes", true, "No"
      );
      this.confirService.confirm(confirmationDialogData).pipe(
         take(1),
         tap((response: ConfirmationResponse) => {
            if(response && response === ConfirmationResponse.Accept)
               this.summaryEvents.deleteAnalysis(this.analysis)
         })
      ).subscribe();
	}

	public showQuickViewDialog() {
		this.dialog.open<
			AnalysisQuickViewComponent,
			AnalysisQuickViewComponentData
		>(AnalysisQuickViewComponent, {
         id: 'quick_view_dialog',
			width: '576px',
			maxWidth: '100vw',
			data: { analysis: this.analysis as Pool },
		});
	}
}
