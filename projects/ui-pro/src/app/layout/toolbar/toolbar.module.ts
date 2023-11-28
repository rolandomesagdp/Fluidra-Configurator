import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { ProcessToolbarComponent } from './process-toolbar/process-toolbar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserProfileButtonModule } from '../user-profile-button/user-profile-button.module';
import { LanguageSelectorModule } from '../language-selector';
import { RouterModule } from '@angular/router';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LogoModule } from '../logo/logo.module';

@NgModule({
	declarations: [
		ProcessToolbarComponent,
		MainToolbarComponent,
		NavigationMenuComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		MatFormFieldModule,
		MatMenuModule,
		UserProfileButtonModule,
		LanguageSelectorModule,
		ConfiguratorTranslateSharedModule,
		LogoModule,
	],
	exports: [
		ProcessToolbarComponent,
		MainToolbarComponent,
		LanguageSelectorModule,
		UserProfileButtonModule,
	],
})
export class ToolbarModule {}
