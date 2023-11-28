import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoolGeolocationFormManager } from 'analysis-forms';
import { AnalysisService, Pool, SubscriptionsManager } from 'configurator-core';
import { finalize, take, takeUntil, tap } from 'rxjs';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';

@Component({
	selector: 'fcp-pool-geolocation',
	templateUrl: './pool-geolocation.component.html',
	styleUrls: ['./pool-geolocation.component.scss'],
})
export class PoolGeolocationComponent implements OnInit {
	@Input({ required: true })
	public analysisId: number;

	public readonly step = 3;
	public readonly totalSteps = 8;
	public saving: boolean;
	public loading: boolean;

	public readonly poolGeolocationFormManager: PoolGeolocationFormManager =
		new PoolGeolocationFormManager();

	private readonly subscriptionsManager: SubscriptionsManager =
		new SubscriptionsManager();

	public countryCode: string;

	constructor(
		private toolbarEvents: ToolbarEvents,
		private analysisService: AnalysisService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.toolbarEvents.showProcessToolbar();
		this.toolbarEvents.hideMainToolbar();

		this.loading = true;
		this.poolGeolocationFormManager.formGroup.disable();

		this.analysisService
			.getPoolById(this.analysisId)
			.pipe(
				take(1),
				takeUntil(this.subscriptionsManager.destroy$),
				tap((pool: Pool) => {
					this.countryCode = pool?.countryCode;
					this.poolGeolocationFormManager.pool = pool;
					this.loading = false;
					this.poolGeolocationFormManager.formGroup.enable();
				})
			)
			.subscribe();
	}

	public onSubmit() {
		if (this.poolGeolocationFormManager.formGroup.valid) {
			this.saving = true;
			this.poolGeolocationFormManager.formGroup.disable();
			this.savePool();
		} else {
			this.poolGeolocationFormManager.formGroup.markAllAsTouched();
		}
	}

	private savePool() {
		this.analysisService
			.savePoolCharacteristics(this.poolGeolocationFormManager.pool)
			.pipe(
				take(1),
				tap((res) => this.onSubmitSuccess(res)),
				finalize(() => this.onSubmitFinalize())
			)
			.subscribe();
	}

	private onSubmitSuccess(savedPool: Pool) {
		this.router.navigate(['analysis', savedPool.id, 'usage']);
	}

	private onSubmitFinalize() {
		this.saving = false;
		this.poolGeolocationFormManager.formGroup.enable();
	}

	previousStep() {
		this.router.navigate(['analysis', this.analysisId, 'products']);
	}
}
