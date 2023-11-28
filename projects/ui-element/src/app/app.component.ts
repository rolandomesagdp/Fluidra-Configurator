import { Component, Input } from '@angular/core';

@Component({
   selector: 'fce-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent  {
   @Input() lang: string = "";
   @Input() buttonMessage: string = "Click me";
   // language: Language = null;

   constructor() {
      // this.language = Language.create(translateService);
   }
}
