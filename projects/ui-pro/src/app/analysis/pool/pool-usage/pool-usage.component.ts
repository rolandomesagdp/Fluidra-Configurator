import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoolUsageFormManager } from 'analysis-forms';
import { AnalysisService, Pool, SubscriptionsManager } from 'configurator-core';
import { tap, take, finalize, takeUntil } from 'rxjs';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';

@Component({
	selector: 'fcp-pool-usage',
	templateUrl: './pool-usage.component.html',
	styleUrls: ['./pool-usage.component.scss'],
})
export class PoolUsageComponent implements OnInit, OnDestroy {
	@Input({ required: true })
	public analysisId: number;

	public readonly step = 4;
	public readonly totalSteps = 8;
	public saving: boolean;
	public loading: boolean;

	public readonly poolUsageFormManager: PoolUsageFormManager =
		new PoolUsageFormManager();

	private readonly subscriptionsManager: SubscriptionsManager =
		new SubscriptionsManager();

	constructor(
		private toolbarEvents: ToolbarEvents,
		private analysisService: AnalysisService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.poolUsageFormManager
			.watchFormChanges()
			.pipe(takeUntil(this.subscriptionsManager.destroy$))
			.subscribe();

		this.toolbarEvents.showProcessToolbar();
		this.toolbarEvents.hideMainToolbar();

		this.loading = true;
		this.poolUsageFormManager.formGroup.disable();

		this.analysisService
			.getPoolById(this.analysisId)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((pool: Pool) => {
					this.poolUsageFormManager.pool = pool;
					this.loading = false;
					this.poolUsageFormManager.formGroup.enable();
				})
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.subscriptionsManager.unsubscribe();
	}

	public onSubmit() {
		if (this.poolUsageFormManager.formGroup.valid) {
			this.saving = true;
			this.poolUsageFormManager.formGroup.disable();
			this.savePool();
		} else {
			this.poolUsageFormManager.formGroup.markAllAsTouched();
		}
	}

	private savePool() {
		this.analysisService
			.savePoolCharacteristics(this.poolUsageFormManager.pool)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((res) => this.onSubmitSuccess(res)),
				finalize(() => this.onSubmitFinalize())
			)
			.subscribe();
	}

	private onSubmitSuccess(savedPool: Pool) {
		this.router.navigate(['analysis', savedPool.id, 'heating']);
	}

	private onSubmitFinalize() {
		this.saving = false;
		this.poolUsageFormManager.formGroup.enable();
	}

	public previousStep() {
		this.router.navigate(['analysis', this.analysisId, 'location']);
	}
}
