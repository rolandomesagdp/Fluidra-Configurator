import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoolProductsFormManager } from 'analysis-forms';
import { AnalysisService, Pool, SubscriptionsManager } from 'configurator-core';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';

@Component({
	selector: 'fcp-pool-products',
	templateUrl: './pool-products.component.html',
	styleUrls: ['./pool-products.component.scss'],
})
export class PoolProductsComponent implements OnInit {
	@Input({ required: true })
	public analysisId: number;

	public readonly step = 2;
	public readonly totalSteps = 8;
	public saving: boolean;
	public loading: boolean;

	public readonly poolProductsFormManager: PoolProductsFormManager =
		new PoolProductsFormManager();

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
		this.poolProductsFormManager.formGroup.disable();

		this.analysisService
			.getPoolById(this.analysisId)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((pool: Pool) => {
					this.poolProductsFormManager.pool = pool;
					this.loading = false;
					this.poolProductsFormManager.formGroup.enable();
				})
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.subscriptionsManager.unsubscribe();
	}

	public onSubmit() {
		if (this.poolProductsFormManager.formGroup.valid) {
			this.saving = true;
			this.poolProductsFormManager.formGroup.disable();
			this.savePool();
		} else {
			this.poolProductsFormManager.formGroup.markAllAsTouched();
		}
	}

	public previousStep() {
		this.router.navigate(['analysis', this.analysisId, 'characteristics']);
	}

	private savePool() {
		this.analysisService
			.savePoolCharacteristics(this.poolProductsFormManager.pool)
			.pipe(
				take(1),
				tap((res) => this.onSubmitSuccess(res)),
				finalize(() => this.onSubmitFinalize())
			)
			.subscribe();
	}

	private onSubmitSuccess(savedPool: Pool) {
		this.router.navigate(['analysis', savedPool.id, 'location']);
	}

	private onSubmitFinalize() {
		this.saving = false;
		this.poolProductsFormManager.formGroup.enable();
	}
}
