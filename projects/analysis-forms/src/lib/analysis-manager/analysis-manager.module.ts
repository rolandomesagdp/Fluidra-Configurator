import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AnalysisHistoryComponent } from './analysis-history/analysis-history.component';
import { AnalysisSummaryComponent } from './analysis-summary/analysis-summary.component';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { AnalysisQuickViewComponent } from './analysis-quick-view/analysis-quick-view.component';
import { SpinnerModule } from '../spinner';
import { NewAnalysisComponent } from './new-analysis/new-analysis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../message';
import { AnalysisTableModule } from './analysis-table';
import { DraftChipModule } from '../draft-chip/draft-chip.component';

@NgModule({
   declarations: [
      AnalysisHistoryComponent,
      AnalysisSummaryComponent,
      AnalysisQuickViewComponent,
      NewAnalysisComponent
   ],
   imports: [
      CommonModule,
      ConfiguratorTranslateSharedModule,
      MessageModule,
      MatTableModule,
      MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatDividerModule,
		MatDialogModule,
		MatAutocompleteModule,
      SpinnerModule,
      AnalysisTableModule,
      ReactiveFormsModule,
      DraftChipModule
   ],
   exports: [
      AnalysisHistoryComponent,
      AnalysisSummaryComponent,
      AnalysisQuickViewComponent,
      NewAnalysisComponent,
      AnalysisTableModule
   ]
})
export class AnalysisManagerModule { }
