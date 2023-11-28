import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'fcc-action-button',
   templateUrl: './action-button.component.html',
   styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
   @Input() text: string;
   @Input({required: true}) title: string;
   @Input() icon: string;
   @Input() disabled: boolean = false;
   @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

   ngOnInit(): void {
      if(!this.text && !this.icon) {
         throw new Error('The action button requires either a text or an icon');
      }
   }

   onButtonClick(): void {
      if(!this.disabled)
         this.onClick.emit();
   }

   getDisabledClass(): string {
      return this.disabled ? "button_disabled" : "button_enabled"
   }
}

@NgModule({
   declarations: [
      ActionButtonComponent
   ],
   imports: [
      CommonModule,
      MatIconModule,
      MatRippleModule
   ],
   exports: [
      ActionButtonComponent
   ]
})
export class ActionButtonModule { }


