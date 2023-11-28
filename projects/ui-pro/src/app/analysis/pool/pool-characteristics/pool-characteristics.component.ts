import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService, Pool, SubscriptionsManager } from 'configurator-core';
import { PoolCharacteristicsFormManager } from 'projects/analysis-forms/src/public-api';
import { finalize, take, tap, takeUntil } from 'rxjs';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';

@Component({
	selector: 'fcp-pool-characteristics',
	templateUrl: './pool-characteristics.component.html',
	styleUrls: ['./pool-characteristics.component.scss'],
})
export class PoolCharacteristicsComponent implements OnInit {
	@Input({ required: true })
	public analysisId: number;

	public readonly step = 1;
	public readonly totalSteps = 8;
	public saving: boolean;
	public loading: boolean;

	public readonly poolCharacteristicsFormManager: PoolCharacteristicsFormManager =
		new PoolCharacteristicsFormManager();

	private readonly subscriptionsManager: SubscriptionsManager =
		new SubscriptionsManager();

	constructor(
		private toolbarEvents: ToolbarEvents,
		private analysisService: AnalysisService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.toolbarEvents.showProcessToolbar();
		this.toolbarEvents.hideMainToolbar();

		this.loading = true;
		this.poolCharacteristicsFormManager.formGroup.disable();

		this.analysisService
			.getPoolById(this.analysisId)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((pool: Pool) => {
					this.poolCharacteristicsFormManager.pool = pool;
					this.loading = false;
					this.poolCharacteristicsFormManager.formGroup.enable();
				})
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.subscriptionsManager.unsubscribe();
	}

	public onSubmit() {
		if (this.poolCharacteristicsFormManager.formGroup.valid) {
			this.saving = true;
			this.poolCharacteristicsFormManager.formGroup.disable();
			this.savePool();
		} else {
			this.poolCharacteristicsFormManager.formGroup.markAllAsTouched();
		}
	}

	private savePool() {
		this.analysisService
			.savePoolCharacteristics(this.poolCharacteristicsFormManager.pool)
			.pipe(
				take(1),
				tap((res) => this.onSubmitSuccess(res)),
				finalize(() => this.onSubmitFinalize())
			)
			.subscribe();
	}

	private onSubmitSuccess(savedPool: Pool) {
		this.router.navigate(['analysis', savedPool.id, 'products']);
	}

	private onSubmitFinalize() {
		this.saving = false;
		this.poolCharacteristicsFormManager.formGroup.enable();
	}
}
