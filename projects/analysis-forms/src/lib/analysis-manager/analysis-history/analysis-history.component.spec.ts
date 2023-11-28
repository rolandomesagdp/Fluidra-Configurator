import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisHistoryComponent } from './analysis-history.component';
import { AnalysisManagerModule } from '../analysis-manager.module';
import {
	BackOfficeClientModule,
	PoolAssistantClientModule,
	ConfiguratorTranslateTestModule,
} from 'configurator-core';

describe('AnalysisHistoryComponent', () => {
	let component: AnalysisHistoryComponent;
	let fixture: ComponentFixture<AnalysisHistoryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AnalysisHistoryComponent],
			imports: [
				AnalysisManagerModule,
				BackOfficeClientModule.forRoot({
					baseUrl: '',
				}),
				PoolAssistantClientModule.forRoot({
					baseUrl: '',
				}),
				ConfiguratorTranslateTestModule,
			],
		});
		fixture = TestBed.createComponent(AnalysisHistoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit onSeeAllClicked when onSeeAllClicked is called', () => {
		const spy = spyOn(component.onSeeAllClicked, 'emit');
		component.onSeeAllAnalysisClicked();
		expect(spy).toHaveBeenCalled();
	});
});
