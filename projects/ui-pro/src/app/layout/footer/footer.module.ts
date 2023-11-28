import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';

@NgModule({
	declarations: [FooterComponent, FooterMenuComponent],
	imports: [CommonModule, MatIconModule, ConfiguratorTranslateSharedModule],
	exports: [FooterComponent],
})
export class FooterModule {}
