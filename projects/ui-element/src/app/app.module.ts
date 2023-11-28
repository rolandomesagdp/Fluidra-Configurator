import { NgModule, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { AnalysisFormsModule } from 'analysis-forms';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AnalysisFormsModule,
		ConfiguratorTranslateSharedModule,
	],
	providers: [],
})
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) {}

	ngDoBootstrap(appRef: ApplicationRef): void {
		const configuratorCustomElement = createCustomElement(AppComponent, {
			injector: this.injector,
		});
		customElements.define('fluidra-configurator', configuratorCustomElement);
	}
}
