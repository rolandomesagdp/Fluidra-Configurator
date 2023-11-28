import { Component, Input, NgModule } from '@angular/core';

@Component({
   selector: 'fcc-title',
   templateUrl: './title.component.html',
   styleUrls: ['./title.component.scss']
})
export class TitleComponent {
   @Input() title: string;
}

@NgModule({
   declarations: [
    TitleComponent
  ],
   imports: [
   ],
   exports: [
      TitleComponent
   ]
})
export class TitleModule { }