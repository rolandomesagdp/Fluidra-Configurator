import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AllAnalysisComponent } from '../all-analysis.component';
import {
	AnalysisService,
	BackOfficeClientEndpoint,
	PoolAssistantClientEndpoint,
	ConfiguratorTranslateTestModule,
} from 'configurator-core';
import { ToolbarEvents } from '../../../layout/toolbar/toolbar-events';
import { AnalysisServiceMock } from './analysis.service.mock';
import { AnalysisFormsModule, AnalysisManagerModule } from 'analysis-forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllAnalysisSpecSetup } from './all-analysis-spec-setup';

describe('AllAnalysisComponent', () => {
	const analysisServiceMock = new AnalysisServiceMock();

	let component: AllAnalysisComponent;
	let fixture: ComponentFixture<AllAnalysisComponent>;
	let toolbarEventsMock = jasmine.createSpyObj('ToolbarEventsMock', [
		'hideProcessToolbar',
		'showMainToolbar',
	]);

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AllAnalysisComponent],
			imports: [
				HttpClientTestingModule,
				AnalysisManagerModule,
				AnalysisFormsModule,
				ConfiguratorTranslateTestModule,
				TranslateModule,
            BrowserAnimationsModule
			],
			providers: [
				{ provide: BackOfficeClientEndpoint, useValue: { baseUrl: '' } },
				{ provide: PoolAssistantClientEndpoint, useValue: { baseUrl: '' } },

				{ provide: AnalysisService, useValue: analysisServiceMock },
				{ provide: ToolbarEvents, use: toolbarEventsMock },
			],
		});
		fixture = TestBed.createComponent(AllAnalysisComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should hide the process toolbar on init', () => {
		const hideProcessToolbarSpy = spyOn(
			component.toolbarEvents,
			'hideProcessToolbar'
		);
		component.ngOnInit();
		expect(hideProcessToolbarSpy).toHaveBeenCalled();
	});

	it('should show the main toolbar on init', () => {
		const showMainToolbarSpy = spyOn(
			component.toolbarEvents,
			'showMainToolbar'
		);
		component.ngOnInit();
		expect(showMainToolbarSpy).toHaveBeenCalled();
	});

	it('should load first items on init', async () => {
		await fixture.whenStable();
		expect(component.analysisList.analyses.length).toEqual(2);
	});

	it('should add more items to the end on load more', async () => {
		component.loadMore();
		await fixture.whenStable();
		expect(component.analysisList.analyses.length).toEqual(4);
	});

   it("should apply filters when requested", async () => {
      const analysisListInitSpy = spyOn(component.analysisList, "initList");
      component.analysisList.onFiltersApplied(AllAnalysisSpecSetup.analysisFilters);
      expect(analysisListInitSpy).toHaveBeenCalled();
   });
});
