import { Injectable } from "@angular/core";
import { AnalysisFilters, Pool } from "configurator-core";
import { AnalysisSelectItem } from "./analysis-select-item";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AnalysisSelectList {
   private filterSubject$: BehaviorSubject<AnalysisFilters> = new BehaviorSubject<AnalysisFilters>(null);
   private _analyses: AnalysisSelectItem[] = [];
   private analysesSubject$: BehaviorSubject<AnalysisSelectItem[]> = new BehaviorSubject<AnalysisSelectItem[]>([...this.analyses]);

   allSelected = false;
   filterEvent$: Observable<AnalysisFilters> = this.filterSubject$.asObservable();
   analyses$: Observable<AnalysisSelectItem[]> = this.analysesSubject$.asObservable();

   get analyses(): AnalysisSelectItem[] {
      return this._analyses;
   }

   get selection(): Pool[] {
      const selectedAnalyses = this._analyses
         .filter((x: AnalysisSelectItem) => x.selected === true)
         .map(x => x.analysis);
      return selectedAnalyses;
   }

   initList(analyses: Pool[]): void {
      this._analyses = [];
      this._analyses = analyses.map(AnalysisSelectItem.create);
      this.analysesSubject$.next([...this._analyses]);
   }

   addToList(analyses: Pool[]): void {
      this.allSelected = false;
      const analysisSelectItems = analyses.map(AnalysisSelectItem.create);
      this._analyses = [...this._analyses.concat(analysisSelectItems)];
      this.analysesSubject$.next([...this._analyses]);
   }

   toggleSelection(): void {
      this._analyses = this._analyses
      .map(analysis => {
         return this.mergeAnalysis(analysis, {selected: this.allSelected})
      });
      this.analysesSubject$.next([...this._analyses]);
   }

   onItemSelectionToggle(): void {
      if(this.selection.length === this._analyses.length) {
         this.allSelected = true;
      }
      else {
         this.allSelected = false;
      }
   }

   onFiltersApplied(newFilters: AnalysisFilters): void {
      this.filterSubject$.next(newFilters);
   }
   
   clear(): void {
      this._analyses = [];
      this.filterSubject$.complete();
      this.filterSubject$ = new BehaviorSubject<AnalysisFilters>(null);
      this.filterEvent$ = this.filterSubject$.asObservable();
      this.analysesSubject$.complete();
      this.analysesSubject$ = new BehaviorSubject<AnalysisSelectItem[]>([...this._analyses]);
      this.analyses$ = this.analysesSubject$.asObservable();
   }

   private mergeAnalysis(source: AnalysisSelectItem, updated: Partial<AnalysisSelectItem>): AnalysisSelectItem {
      return {...source, ...updated};
   }
}
