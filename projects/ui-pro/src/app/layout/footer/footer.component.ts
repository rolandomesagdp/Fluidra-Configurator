import { Component } from '@angular/core';
import { LanguageService } from 'configurator-core';

@Component({
	selector: 'fcp-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	constructor(public language: LanguageService) {}
}
