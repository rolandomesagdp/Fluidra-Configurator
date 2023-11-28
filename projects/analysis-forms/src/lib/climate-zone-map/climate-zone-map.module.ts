import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ClimateZoneMapComponent } from './climate-zone-map.component';

@NgModule({
	declarations: [ClimateZoneMapComponent],
	imports: [CommonModule, MatDialogModule],
	exports: [ClimateZoneMapComponent],
})
export class ClimateZoneMapModule {}
