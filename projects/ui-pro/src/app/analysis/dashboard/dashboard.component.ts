import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarEvents } from '../../layout/toolbar/toolbar-events';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AnalysisService,
	Pool,
	PoolGeneralInfo,
	SubscriptionsManager,
	UserService,
} from 'configurator-core';
import { finalize, take, takeUntil, tap } from 'rxjs';
import {
	AnalysisActionType,
	AnalysisEvent,
	AnalysisEventEmitter,
} from 'analysis-forms';

@Component({
	selector: 'fcp-analysis-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
	savingAnalysis: boolean = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toolbarEvents: ToolbarEvents,
		private analysisService: AnalysisService,
		private userService: UserService,
		private analysisEvents: AnalysisEventEmitter,
		private subscriptionManager: SubscriptionsManager
	) {}

	ngOnInit() {
		this.toolbarEvents.hideProcessToolbar();
		this.toolbarEvents.showMainToolbar();
		this.analysisEvents.analysisActionEvent$
			.pipe(
				takeUntil(this.subscriptionManager.destroy$),
				tap((event: AnalysisEvent) => this.processAnalysisEvent(event))
			)
			.subscribe();
	}

	seeAllAnalysis(): void {
		this.router.navigate(['all'], {
			relativeTo: this.activatedRoute,
		});
	}

	isAdminUser(): boolean {
		return this.userService.currentUser?.isAdmin;
	}

	saveNewAnalysis(analysis: Pool): void {
		this.savingAnalysis = true;
		this.analysisService
			.savePoolGeneralCharacteristics(analysis)
			.pipe(
				take(1),
				takeUntil(this.subscriptionManager.destroy$),
				tap((savedAnalysis) => this.onAnalysisSaveSuccess(savedAnalysis)),
				finalize(() => (this.savingAnalysis = false))
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.subscriptionManager.unsubscribe();
	}

	private processAnalysisEvent(event: AnalysisEvent): void {
		if (event) {
			switch (event.action) {
				case AnalysisActionType.deleteAnalysis:
					this.deleteAnalysis(event.analysis);
					break;
				case AnalysisActionType.duplicateAnalysis:
					this.duplicateAnalysis(event.analysis);
					break;
			}
		}
	}

	private duplicateAnalysis(analysis: Pool) {
		this.analysisService.duplicateAnalysis(analysis).subscribe();
	}

	private deleteAnalysis(analysis: Pool) {
		this.analysisService.deleteAnalysis(analysis).subscribe();
	}

	private onAnalysisSaveSuccess(savedAnalysis: PoolGeneralInfo): void {
		if (savedAnalysis) {
			const poolRoute: string = `${savedAnalysis.id}/characteristics`;
			this.router.navigate([poolRoute], {
				relativeTo: this.activatedRoute,
			});
		}
	}
}
