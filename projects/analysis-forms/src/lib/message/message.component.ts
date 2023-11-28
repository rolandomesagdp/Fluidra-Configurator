import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'fcc-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
	@Input() icon: string;
	@Input() messageTitle: string;
	@Input() description: string;
	@Input() hasClose: boolean = true;
	@Input() color: string;
	@Input() background: string;
	@Input() actionLabel?: string;

	@Output() onClickAction?: EventEmitter<void> = new EventEmitter();

	@Output() onClose: EventEmitter<void> = new EventEmitter();
	show: boolean = true;

	hideMessage() {
		this.show = false;
		this.onClose.emit();
	}
}
