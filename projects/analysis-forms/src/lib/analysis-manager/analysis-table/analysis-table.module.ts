import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { AnalysisTableRowComponent } from './analysis-table-row/analysis-table-row.component';
import { AnalysisTableHeaderComponent } from './analysis-table-header/analysis-table-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalysisTableSortComponent } from './analysis-table-sort/analysis-table-sort.component';
import { DraftChipModule } from '../../draft-chip';
import { ActionButtonModule } from './action-button';
import { AnalysisSelectList } from './analysis-select-list/analysis-select-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormControlContainerModule } from '../../configurator-forms/form-control-container';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { AnalysisFiltersComponent } from './analysis-filters/analysis-filters.component';

@NgModule({
   declarations: [
      AnalysisTableRowComponent,
      AnalysisTableHeaderComponent,
      AnalysisTableSortComponent,
      AnalysisFiltersComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatMomentDateModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatIconModule,
      MatRippleModule,
      MatButtonModule,
      FormsModule,
      FormControlContainerModule,
      DraftChipModule,
      ActionButtonModule,
      ConfiguratorTranslateSharedModule
   ],
   exports: [
      ActionButtonModule,
      AnalysisTableRowComponent,
      AnalysisTableHeaderComponent,
      AnalysisTableSortComponent,
      AnalysisFiltersComponent
   ],
   providers: [ AnalysisSelectList ]
})
export class AnalysisTableModule { }
