import { Component, Input } from '@angular/core';
import { ScreenBreakpoints } from '../../..';
import { AnalysisSelectItem } from '../analysis-select-list/analysis-select-item';
import { AnalysisSelectList } from '../analysis-select-list/analysis-select-list';

@Component({
   selector: 'fcc-analysis-table-row',
   templateUrl: './analysis-table-row.component.html',
   styleUrls: ['./analysis-table-row.component.scss']
})
export class AnalysisTableRowComponent {
   @Input() analysisItem: AnalysisSelectItem;

   constructor(public analysisList: AnalysisSelectList) { }

   getRowClasses(): string {
      return this.analysisItem.selected ? "row_selected" : "row_not_selected";
   }

   printButtonText(textToPrint: string): string {
      if(window.innerWidth < ScreenBreakpoints.xl) {
         return ""; 
      }
      return textToPrint;
   }
}
