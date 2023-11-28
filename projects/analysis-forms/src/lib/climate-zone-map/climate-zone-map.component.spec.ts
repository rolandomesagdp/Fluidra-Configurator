import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateZoneMapComponent } from './climate-zone-map.component';
import { CommonModule } from '@angular/common';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';

describe('ClimateZoneMapComponent', () => {
	let component: ClimateZoneMapComponent;
	let fixture: ComponentFixture<ClimateZoneMapComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ClimateZoneMapComponent],
			imports: [CommonModule, MatDialogModule],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: { map: 'climate_map_1.jpg' } },
			],
		});
		fixture = TestBed.createComponent(ClimateZoneMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
