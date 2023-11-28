import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessToolbarComponent } from './process-toolbar.component';
import { LayoutModule } from '../../layout.module';
import {
	ConfiguratorTranslateTestModule,
	LanguageService,
} from 'configurator-core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { By } from '@angular/platform-browser';
import { FluidraLogoComponent } from '../../logo/fluidra-logo/fluidra-logo.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { LanguageSelectorComponent } from '../../language-selector';
import { UserProfileButtonComponent } from '../../user-profile-button/user-profile-button.component';

describe('ProcessToolbarComponent', () => {
	let component: ProcessToolbarComponent;
	let fixture: ComponentFixture<ProcessToolbarComponent>;
	let harnessLoader: HarnessLoader;
	let language: LanguageService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ProcessToolbarComponent],
			imports: [
				LayoutModule,
				ConfiguratorTranslateTestModule,
				RouterTestingModule,
				BrowserAnimationsModule,
			],
		});
		fixture = TestBed.createComponent(ProcessToolbarComponent);
		language = TestBed.inject(LanguageService);
		language.startup();
		component = fixture.componentInstance;
		harnessLoader = TestbedHarnessEnvironment.loader(fixture);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Usage', async () => {
		it('should be hidden by default', () => {
			const processToolbar = fixture.debugElement.query(
				By.css('#fcp-process-toolbar')
			);
			expect(processToolbar).toBeFalsy();
		});

		it('should display on demand', async () => {
			// act
			component.toolbarEvents.showProcessToolbar();
			fixture.detectChanges();

			// assert
			const processToolbar = await harnessLoader.getHarness(MatToolbarHarness);
			expect(processToolbar).toBeTruthy();
		});

		it('should hide on demand', async () => {
			// arrange
			component.toolbarEvents.showProcessToolbar();
			fixture.detectChanges();

			// Act
			component.toolbarEvents.hideProcessToolbar();
			fixture.detectChanges();

			// assert
			const processToolbar = fixture.debugElement.query(
				By.css('#fcp-process-toolbar')
			);
			expect(processToolbar).toBeFalsy();
		});
	});

	describe('Structure', () => {
		beforeEach(() => {
			component.toolbarEvents.showProcessToolbar();
			fixture.detectChanges();
		});

		it('should display a back button', () => {
			const backButton = harnessLoader.getHarness(MatButtonHarness);
			expect(backButton).toBeTruthy();
		});

		it('should contain the Fluidra logo', () => {
			const processToolbar = fixture.debugElement.query(
				By.css('#fcp-process-toolbar')
			);
			const fluidraLogo = processToolbar.query(
				By.directive(FluidraLogoComponent)
			);
			expect(fluidraLogo).toBeTruthy();
		});

		it('should contain a Logout button', () => {
			const fluidraProHeader = fixture.debugElement.query(
				By.css('#fcp-process-toolbar')
			);
			const logoutButton = fluidraProHeader.query(
				By.directive(UserProfileButtonComponent)
			);

			expect(logoutButton).toBeTruthy();
		});

		it('should contain a language translation dropdown', () => {
			const fluidraProHeader = fixture.debugElement.query(
				By.css('#fcp-process-toolbar')
			);
			const languageSelector = fluidraProHeader.query(
				By.directive(LanguageSelectorComponent)
			);

			expect(languageSelector).toBeTruthy();
		});
	});
});
