import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';

@Component({
	selector: 'fcc-draft-chip',
	templateUrl: './draft-chip.component.html',
	styleUrls: ['./draft-chip.component.scss'],
})
export class DraftChipComponent {}

@NgModule({
	declarations: [DraftChipComponent],
	imports: [CommonModule, MatChipsModule, ConfiguratorTranslateSharedModule],
	exports: [DraftChipComponent],
})
export class DraftChipModule {}
