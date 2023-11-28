import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisQuickViewComponent } from './analysis-quick-view.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisManagerModule } from '../analysis-manager.module';
import { ConfiguratorTranslateTestModule } from 'configurator-core';

describe('AnalysisQuickViewComponent', () => {
	let component: AnalysisQuickViewComponent;
	let fixture: ComponentFixture<AnalysisQuickViewComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AnalysisQuickViewComponent],
			imports: [AnalysisManagerModule, ConfiguratorTranslateTestModule],
			providers: [
				{
					provide: MAT_DIALOG_DATA,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(AnalysisQuickViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
