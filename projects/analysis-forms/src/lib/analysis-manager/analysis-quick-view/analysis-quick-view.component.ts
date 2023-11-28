import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisQuickViewComponentData } from './analysis-quick-view.component.interface';
import { Pool } from 'configurator-core';

@Component({
	selector: 'fcc-analysis-quick-view',
	templateUrl: './analysis-quick-view.component.html',
	styleUrls: ['./analysis-quick-view.component.scss'],
})
export class AnalysisQuickViewComponent
	implements AnalysisQuickViewComponentData
{
	public analysis: Pool;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: AnalysisQuickViewComponentData
	) {
		this.analysis = data?.analysis;
	}
}
