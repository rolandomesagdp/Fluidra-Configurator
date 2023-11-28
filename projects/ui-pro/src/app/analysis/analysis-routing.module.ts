import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllAnalysisComponent } from './all-analysis/all-analysis.component';

const routes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'all', component: AllAnalysisComponent },
	{ path: ':analysisId', loadChildren: () => import('./pool') },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnalysisRoutingModule {}
