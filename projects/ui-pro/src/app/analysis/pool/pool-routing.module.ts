import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoolCharacteristicsComponent } from './pool-characteristics';
import { PoolGeolocationComponent } from './pool-geolocation';
import { PoolUsageComponent } from './pool-usage';
import { PoolProductsComponent } from './pool-products';
import { PoolHeatingSolutionsComponent } from './pool-heating-solutions';

const routes: Routes = [
	{ path: 'characteristics', component: PoolCharacteristicsComponent },
	{ path: 'products', component: PoolProductsComponent },
	{ path: 'location', component: PoolGeolocationComponent },
	{ path: 'usage', component: PoolUsageComponent },
	{ path: 'heating', component: PoolHeatingSolutionsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PoolRoutingModule {}
