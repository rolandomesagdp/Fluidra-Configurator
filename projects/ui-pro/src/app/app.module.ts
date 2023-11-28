import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout';
import {
	BackOfficeClientModule,
	PoolAssistantClientModule,
	ConfiguratorTranslateModule,
} from 'configurator-core';
import { environment } from '../environments/environment';
import { EnvironmentCodeEnum } from '../environments/environment.enum';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		LayoutModule,
		BackOfficeClientModule.forRoot({
			baseUrl: environment.backOfficeUrl,
		}),
		PoolAssistantClientModule.forRoot({
			baseUrl: environment.poolAssistantUrl,
		}),
		ConfiguratorTranslateModule.forRoot({
			useDefaultLang: environment.code === EnvironmentCodeEnum.production,
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
