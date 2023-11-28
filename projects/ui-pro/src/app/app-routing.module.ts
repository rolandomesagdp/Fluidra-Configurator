import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'analysis' },
	{
		path: '',
		component: AnalysisComponent,
		children: [
			{
				path: 'analysis',
				loadChildren: () => import('./analysis'),
			},
		],
	},
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./admin'),
			},
		],
	},
	{ path: '**', redirectTo: 'analysis' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			bindToComponentInputs: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
