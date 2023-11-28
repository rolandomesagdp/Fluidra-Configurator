import { Component } from '@angular/core';
import { ToolbarEvents } from '../toolbar-events';

@Component({
   selector: 'fcp-process-toolbar',
   templateUrl: './process-toolbar.component.html',
   styleUrls: ['./process-toolbar.component.scss', '../toolbar-styles.scss']
})
export class ProcessToolbarComponent {
   
   constructor(public toolbarEvents: ToolbarEvents) { }
}
