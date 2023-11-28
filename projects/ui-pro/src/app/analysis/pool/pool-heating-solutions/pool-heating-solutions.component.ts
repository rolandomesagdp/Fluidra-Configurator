import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoolHeatingSolutionsFormManager } from 'analysis-forms';
import {
	AnalysisService,
	Pool,
	Product,
	SubscriptionsManager,
} from 'configurator-core';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';

@Component({
	selector: 'fcp-pool-heating-solutions',
	templateUrl: './pool-heating-solutions.component.html',
	styleUrls: ['./pool-heating-solutions.component.scss'],
})
export class PoolHeatingSolutionsComponent implements OnInit {
	@Input({ required: true })
	public analysisId: number;

	public readonly step = 5;
	public readonly totalSteps = 8;
	public saving: boolean;
	public loading: boolean;

	public productList: Product[];

	public readonly poolHeatingSolutionsFormManager: PoolHeatingSolutionsFormManager =
		new PoolHeatingSolutionsFormManager();

	private readonly subscriptionsManager: SubscriptionsManager =
		new SubscriptionsManager();

	constructor(
		private toolbarEvents: ToolbarEvents,
		private analysisService: AnalysisService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.toolbarEvents.showProcessToolbar();
		this.toolbarEvents.hideMainToolbar();

		this.loading = true;
		this.poolHeatingSolutionsFormManager.formGroup.disable();

		this.analysisService
			.getPoolById(this.analysisId)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((pool: Pool) => {
					this.poolHeatingSolutionsFormManager.pool = pool;
					this.loading = false;
					this.poolHeatingSolutionsFormManager.formGroup.enable();
				})
			)
			.subscribe();

		this.loadProducts();
	}

	public ngOnDestroy(): void {
		this.subscriptionsManager.unsubscribe();
	}

	public onSubmit() {
		if (this.poolHeatingSolutionsFormManager.formGroup.valid) {
			this.saving = true;
			this.poolHeatingSolutionsFormManager.formGroup.disable();
			this.savePool();
		} else {
			this.poolHeatingSolutionsFormManager.formGroup.markAllAsTouched();
		}
	}

	private loadProducts() {
		this.analysisService
			.getAnalysisResult(this.analysisId)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((res) => {
					this.productList = res;
				})
			)
			.subscribe();
	}

	private savePool() {
		this.analysisService
			.savePoolCharacteristics(this.poolHeatingSolutionsFormManager.pool)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((res) => this.onSubmitSuccess(res)),
				finalize(() => this.onSubmitFinalize())
			)
			.subscribe();
	}

	private onSubmitSuccess(savedPool: Pool) {
		this.router.navigate(['analysis', savedPool.id, 'next-step']);
	}

	private onSubmitFinalize() {
		this.saving = false;
		this.poolHeatingSolutionsFormManager.formGroup.enable();
	}

	public previousStep() {
		this.router.navigate(['analysis', this.analysisId, 'usage']);
	}
}
