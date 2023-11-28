import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {
	ConfiguratorTranslateTestModule,
	LanguageService,
} from 'configurator-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('LanguageSelectorComponent', async () => {
	let component: LanguageSelectorComponent;
	let fixture: ComponentFixture<LanguageSelectorComponent>;
	let language: LanguageService;
	let loader: HarnessLoader;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [LanguageSelectorComponent],
			imports: [
				BrowserAnimationsModule,
				MatIconModule,
				MatSelectModule,
				MatFormFieldModule,
				ReactiveFormsModule,
				ConfiguratorTranslateTestModule,
			],
		});
		fixture = TestBed.createComponent(LanguageSelectorComponent);
		language = TestBed.inject(LanguageService);
		language.startup();
		component = fixture.componentInstance;
		loader = TestbedHarnessEnvironment.loader(fixture);
		fixture.detectChanges();
	});

	it('should create', async () => {
		expect(component).toBeTruthy();
	});

	it('should display the full list of available languages', async () => {
		const languageDropdown = await loader.getHarness(MatSelectHarness);
		await languageDropdown.open();
		const languageDropdownOptions = await languageDropdown.getOptions();

		expect(component.language.availableLanguages.length).toEqual(
			languageDropdownOptions.length
		);
		for (const language of component.language.availableLanguages) {
			const option = await languageDropdown.getOptions({ text: language.name });
			expect(option).toBeTruthy();
		}
	});
});
