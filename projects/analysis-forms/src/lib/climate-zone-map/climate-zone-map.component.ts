import { Component, Inject } from '@angular/core';
import { ClimateZoneMapComponentData } from './climate-zone-map-component.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'fcc-climate-zone-map',
	templateUrl: './climate-zone-map.component.html',
	styleUrls: ['./climate-zone-map.component.scss'],
})
export class ClimateZoneMapComponent {
	constructor(
		public dialogRef: MatDialogRef<ClimateZoneMapComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ClimateZoneMapComponentData
	) {}
}
