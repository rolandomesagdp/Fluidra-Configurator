import {
	AnalysisService,
	Pool,
	SubscriptionsManager,
	UserService,
} from 'configurator-core';
import { AppModule } from './../../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import AnalysisModule from '../analysis.module';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToolbarEvents } from '../../layout/toolbar/toolbar-events';
import {
	AnalysisActionType,
	AnalysisEvent,
	AnalysisEventEmitter,
} from 'analysis-forms';
import { autoSpy, SpyOf } from 'projects/core/src/lib/test';
import PoolModule from '../pool';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;

	const router: SpyOf<Router> = autoSpy(Router, ['navigate']);
	const activatedRoute: SpyOf<ActivatedRoute> = autoSpy(ActivatedRoute);
	const toolbarEvents: SpyOf<ToolbarEvents> = autoSpy(ToolbarEvents);
	const analysisService: SpyOf<AnalysisService> = autoSpy(AnalysisService);
	const userService: SpyOf<UserService> = autoSpy(UserService);
	const analysisEvents: SpyOf<AnalysisEventEmitter> =
		autoSpy(AnalysisEventEmitter);

	const analysisActionSubject = new BehaviorSubject<AnalysisEvent>(null);

	const subscriptionsManager: SpyOf<SubscriptionsManager> =
		autoSpy(SubscriptionsManager);

	beforeEach(() => {
		router.routerState = { root: '' } as any;
		router.navigate.and.returnValue(Promise.resolve(true));
		userService.currentUser = {
			id: 1,
			name: 'Test',
			isAdmin: true,
		};

		analysisEvents.analysisActionEvent$ = analysisActionSubject.asObservable();

		analysisService.deleteAnalysis.and.returnValue(of(1));
		analysisService.duplicateAnalysis.and.returnValue(
			of({
				id: 2,
				name: 'test',
			})
		);

		analysisService.savePoolGeneralCharacteristics.and.returnValue(
			of({
				id: 1,
				name: 'test',
			})
		);

		toolbarEvents.hideProcessToolbar.and.returnValue(null);
		toolbarEvents.showMainToolbar.and.returnValue(null);

		subscriptionsManager.destroy$ = new Subject<void>();

		TestBed.configureTestingModule({
			declarations: [DashboardComponent],
			imports: [AppModule, AnalysisModule, PoolModule, RouterTestingModule],

			providers: [
				{ provide: Router, useValue: router },
				{ provide: ActivatedRoute, useValue: activatedRoute },
				{ provide: ToolbarEvents, useValue: toolbarEvents },
				{ provide: AnalysisService, useValue: analysisService },
				{ provide: UserService, useValue: userService },
				{ provide: AnalysisEventEmitter, useValue: analysisEvents },
				{ provide: SubscriptionsManager, useValue: subscriptionsManager },
			],
		});

		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when ngOnInit is executed', () => {
		it('it should call to hide process toolbar and show the main toolbar', () => {
			// act
			component.ngOnInit();

			// assert
			expect(toolbarEvents.hideProcessToolbar).toHaveBeenCalled();
			expect(toolbarEvents.showMainToolbar).toHaveBeenCalled();
		});

		it('when null analysis event fired  it should prevent call analysis service actions', () => {
			// arrange
			analysisActionSubject.next(null);

			// act
			component.ngOnInit();

			// assert
			expect(analysisService.deleteAnalysis).not.toHaveBeenCalledTimes(2);
			expect(analysisService.duplicateAnalysis).not.toHaveBeenCalledTimes(2);
		});

		it('when delete analysis event fired it should call to delete analysis service', () => {
			// arrange
			analysisActionSubject.next({
				action: AnalysisActionType.deleteAnalysis,
				analysis: null,
			});

			// act
			component.ngOnInit();

			// assert
			expect(analysisService.deleteAnalysis).toHaveBeenCalled();
		});

		it('when duplicate analysis event fired it should call to duplicate analysis service', () => {
			// arrange
			analysisActionSubject.next({
				action: AnalysisActionType.duplicateAnalysis,
				analysis: null,
			});

			// act
			component.ngOnInit();

			// assert
			expect(analysisService.duplicateAnalysis).toHaveBeenCalled();
		});

		it('when not defined action analysis event fired it should prevent call to service actions and throw error', () => {
			// arrange
			analysisActionSubject.next({
				action: 'test' as any,
				analysis: null,
			});

			// act
			component.ngOnInit();

			// assert
			expect(analysisService.deleteAnalysis).not.toHaveBeenCalledTimes(2);
			expect(analysisService.duplicateAnalysis).not.toHaveBeenCalledTimes(2);
		});
	});

	it('when seeAllAnalysis is called it should call to router navigate', () => {
		// act
		component.seeAllAnalysis();

		// assert
		expect(router.navigate).toHaveBeenCalled();
	});

	describe('when isAdminUser is called ', () => {
		it('it should return true when current user is true', () => {
			// arrange
			userService.currentUser.isAdmin = true;
			// act
			const result = component.isAdminUser();

			// assert
			expect(result).toBeTrue();
		});

		it('it should return false when current user is false', () => {
			// arrange
			userService.currentUser.isAdmin = false;
			// act
			const result = component.isAdminUser();

			// assert
			expect(result).toBeFalse();
		});
	});

	it('when saveNewAnalysis is called it should', () => {
		// arrange
		const pool: Pool = null;

		// act
		component.saveNewAnalysis(pool);

		// assert
		expect(analysisService.savePoolGeneralCharacteristics).toHaveBeenCalled();
	});

	it('when ngOnDestroy is called it should call to manager to clear all subscriptions', () => {
		// act
		component.ngOnDestroy();

		// assert
		expect(subscriptionsManager.unsubscribe).toHaveBeenCalled();
	});
});
