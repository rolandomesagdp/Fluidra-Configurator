import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisComponent } from './analysis.component';
import { LayoutModule } from '../layout';
import {
	ConfiguratorTranslateTestModule,
	LanguageService,
} from 'configurator-core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FooterComponent } from '../layout/footer/footer.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('AnalysisComponent', async () => {
	let component: AnalysisComponent;
	let fixture: ComponentFixture<AnalysisComponent>;
	let languageService: LanguageService;
	let loader: HarnessLoader;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [AnalysisComponent],
			imports: [
				BrowserAnimationsModule,
				ConfiguratorTranslateTestModule,
				RouterTestingModule,
				LayoutModule,
			],
		});

		fixture = TestBed.createComponent(AnalysisComponent);
		languageService = TestBed.inject(LanguageService);
		languageService.startup();
		component = fixture.componentInstance;
		loader = TestbedHarnessEnvironment.loader(fixture);
		fixture.detectChanges();

		const languageSelect = await loader.getHarness(
			MatSelectHarness.with({ selector: '#language-selector-options' })
		);
		await languageSelect.clickOptions({ text: 'ES' });
		await languageSelect.clickOptions({ text: 'EN' });
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Layout', async () => {
		describe('Header', async () => {
			it('should be in english by default', async () => {
				fixture.detectChanges();
				const userButtonTitle = fixture.debugElement.query(
					By.css('.user-profile-button-title')
				).nativeElement;
				expect(userButtonTitle.innerHTML).toEqual('Log out');
			});

			it('should get translated if user changes the current application language', async () => {
				// arrange
				const languageSelect = await loader.getHarness(
					MatSelectHarness.with({ selector: '#language-selector-options' })
				);

				// act
				await languageSelect.clickOptions({ text: 'ES' });

				// assert
				const userButtonTitle = fixture.debugElement.query(
					By.css('.user-profile-button-title')
				).nativeElement;
				expect(userButtonTitle.innerHTML).toEqual('Salir');
			});

			it('should print the Main Toolbar', () => {
				// arrange
				const mainToolbar = fixture.debugElement.query(
					By.css('#fcp_main_toolbar')
				);

				// assert
				expect(mainToolbar).toBeTruthy();
			});

			it('should not print the Process Toolbar', () => {
				// arrange
				const processToolgar = fixture.debugElement.query(
					By.css('#fcp-process-toolbar')
				);

				// assert
				expect(processToolgar).toBeFalsy();
			});
		});

		describe('Footer', () => {
			it('should be printed', () => {
				// arrange
				const footer = fixture.debugElement.query(
					By.directive(FooterComponent)
				);

				// assert
				expect(footer).toBeTruthy();
			});

			it('should get translated if user changes the current application language', async () => {
				// arrange
				const languageSelect = await loader.getHarness(
					MatSelectHarness.with({ selector: '#language-selector-options' })
				);

				// act
				await languageSelect.clickOptions({ text: 'ES' });

				// assert
				const copyrightDiv = fixture.debugElement.query(
					By.css('#footer-copyright')
				).nativeElement;
				expect(copyrightDiv.innerHTML).toEqual(
					'© Fluidra 2023. Todos los derechos reservados'
				);
			});
		});
	});
});
