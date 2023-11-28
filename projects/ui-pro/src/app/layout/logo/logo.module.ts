import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluidraLogoComponent } from './fluidra-logo/fluidra-logo.component';
import { RouterModule } from '@angular/router';
import { ConfiguratorLogoComponent } from './configurator-logo/configurator-logo.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';

@NgModule({
	declarations: [FluidraLogoComponent, ConfiguratorLogoComponent],
	imports: [
		CommonModule,
		RouterModule,
		MatIconModule,
		MatRippleModule,
		MatMenuModule,
		ConfiguratorTranslateSharedModule,
	],
	exports: [FluidraLogoComponent, ConfiguratorLogoComponent],
})
export class LogoModule {}
