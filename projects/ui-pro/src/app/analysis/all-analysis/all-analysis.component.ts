import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarEvents } from '../../layout/toolbar/toolbar-events';
import { AnalysisFilters, AnalysisService, Pool } from 'configurator-core';
import { filter, take, tap } from 'rxjs';
import {  AnalysisSelectList } from 'analysis-forms';

@Component({
	selector: 'fcp-all-analysis',
	templateUrl: './all-analysis.component.html',
	styleUrls: ['./all-analysis.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllAnalysisComponent implements OnInit, OnDestroy {
   loading: boolean = false;

	constructor(
		public toolbarEvents: ToolbarEvents,
		public analysisService: AnalysisService,
      public analysisList: AnalysisSelectList
	) { }

	ngOnInit(): void {
		this.toolbarEvents.hideProcessToolbar();
		this.toolbarEvents.showMainToolbar();
      this.subscribeToFiltersChange();
      this.loading = true;
      this.analysisService.getAll(1).pipe(
         take(1),
         tap((analyses: Pool[]) => {
            this.loading = false;
            this.analysisList.initList(analyses);
         })
      ).subscribe();
	}

   loadMore(): void {
      this.loading = true;
      this.analysisService.getAll(2).pipe(
         take(1),
         tap((analyses: Pool[]) => {
            this.analysisList.addToList(analyses);
            this.loading = false;
         })
      ).subscribe();
   }

   ngOnDestroy(): void {
      this.analysisList.clear();
   }

   private subscribeToFiltersChange(): void {
      this.analysisList.filterEvent$.pipe(
         tap((filters: AnalysisFilters) => {
            if(filters) this.filterAnalysisList(filters);
         })
      ).subscribe();
   }

   private filterAnalysisList(filters: AnalysisFilters): void {
      this.loading = true;
      this.analysisService.getAll(1, filters).pipe(
         take(1),
         tap((analyses: Pool[]) => {
            this.analysisList.initList(analyses);
            this.loading = false;
         })
      ).subscribe();
   }
}
