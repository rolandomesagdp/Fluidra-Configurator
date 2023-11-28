import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileButtonComponent } from './user-profile-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';

@NgModule({
	declarations: [UserProfileButtonComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		ConfiguratorTranslateSharedModule,
	],
	exports: [UserProfileButtonComponent],
})
export class UserProfileButtonModule {}
