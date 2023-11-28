import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainToolbarComponent } from './main-toolbar.component';
import {
	ConfiguratorTranslateTestModule,
	LanguageService,
} from 'configurator-core';
import { LayoutModule } from '../../layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { FluidraLogoComponent } from '../../logo/fluidra-logo/fluidra-logo.component';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { UserProfileButtonComponent } from '../../user-profile-button/user-profile-button.component';
import { ConfiguratorLogoComponent } from '../../logo/configurator-logo/configurator-logo.component';
import { LanguageSelectorComponent } from '../../language-selector';

describe('MainToolbarComponent', async () => {
	let component: MainToolbarComponent;
	let fixture: ComponentFixture<MainToolbarComponent>;
	let languageService: LanguageService;
	let harnessLoader: HarnessLoader;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [MainToolbarComponent],
			imports: [
				LayoutModule,
				ConfiguratorTranslateTestModule,
				RouterTestingModule,
				BrowserAnimationsModule,
			],
		});
		fixture = TestBed.createComponent(MainToolbarComponent);
		languageService = TestBed.inject(LanguageService);
		languageService.startup();
		component = fixture.componentInstance;
		fixture.detectChanges();
		harnessLoader = TestbedHarnessEnvironment.loader(fixture);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Usage', async () => {
		it('should be shown by default', async () => {
			const mainToolbarHarness = await harnessLoader.getHarness(
				MatToolbarHarness
			);
			expect(mainToolbarHarness).toBeTruthy();
		});

		it('should hide on demand', async () => {
			// act
			component.toolbarEvents.hideMainToolbar();
			fixture.detectChanges();

			// assert
			const mainToolbarHarness = fixture.debugElement.query(
				By.css('#fcp_main_toolbar')
			);
			expect(mainToolbarHarness).toBeFalsy();
		});

		it('should show on demand', async () => {
			// arrange
			component.toolbarEvents.hideMainToolbar();
			fixture.detectChanges();

			component.toolbarEvents.showMainToolbar();
			fixture.detectChanges();

			// assert
			const mainToolbarHarness = await harnessLoader.getHarness(
				MatToolbarHarness
			);
			expect(mainToolbarHarness).toBeTruthy();
		});
	});

	describe('Fluidra Pro header', () => {
		it('should contain the Fluidra logo', () => {
			const fluidraProHeader = fixture.debugElement.query(
				By.css('#fcp-toolbar-primary')
			);
			const fluidraLogo = fluidraProHeader.query(
				By.directive(FluidraLogoComponent)
			);
			expect(fluidraLogo).toBeTruthy();
		});

		it('should contain the Fluidra Pro navigation manu', async () => {
			const fluidraProHeader = fixture.debugElement.query(
				By.css('#fcp-toolbar-primary')
			);
			const fluidraProNavigationManu = fluidraProHeader.query(
				By.directive(NavigationMenuComponent)
			);

			expect(fluidraProNavigationManu).toBeTruthy();
		});

		it('should contain a Logout button', async () => {
			const fluidraProHeader = fixture.debugElement.query(
				By.css('#fcp-toolbar-primary')
			);
			const logoutButton = fluidraProHeader.query(
				By.directive(UserProfileButtonComponent)
			);

			expect(logoutButton).toBeTruthy();
		});

		it('should contain a language translation dropdown', async () => {
			const fluidraProHeader = fixture.debugElement.query(
				By.css('#fcp-toolbar-primary')
			);
			const logoutButton = fluidraProHeader.query(
				By.directive(LanguageSelectorComponent)
			);

			expect(logoutButton).toBeTruthy();
		});
	});

	describe('Configurators header', () => {
		it('should contain the Configurators logo', () => {
			const configuratorsHeader = fixture.debugElement.query(
				By.css('#fcp_secondary_toolbar')
			);
			const configuratorLogo = configuratorsHeader.query(
				By.directive(ConfiguratorLogoComponent)
			);

			expect(configuratorLogo).toBeTruthy();
		});
	});
});
