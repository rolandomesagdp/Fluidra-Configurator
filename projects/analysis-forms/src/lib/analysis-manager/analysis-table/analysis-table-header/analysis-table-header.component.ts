import { Component } from '@angular/core';
import { AnalysisSelectList } from '../analysis-select-list';

@Component({
   selector: 'fcc-analysis-table-header',
   templateUrl: './analysis-table-header.component.html',
   styleUrls: ['./analysis-table-header.component.scss']
})
export class AnalysisTableHeaderComponent {
   constructor(public analysisList: AnalysisSelectList) { }
}
