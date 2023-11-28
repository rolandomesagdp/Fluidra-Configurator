import { Component } from '@angular/core';
import { ToolbarEvents } from '../toolbar-events';

@Component({
  selector: 'fcp-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss', '../toolbar-styles.scss']
})
export class MainToolbarComponent {
  
    constructor(public toolbarEvents: ToolbarEvents) { }

}
