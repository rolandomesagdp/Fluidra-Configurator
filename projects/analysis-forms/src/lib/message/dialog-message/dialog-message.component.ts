import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationResponse } from './dialog-message-response.enum';
import { DialogMessageData } from './dialog-message-data';

@Component({
	selector: 'fcc-dialog-message',
	templateUrl: './dialog-message.component.html',
	styleUrls: ['./dialog-message.component.scss'],
})
export class DialogMessageComponent {
	constructor(public dialogRef: MatDialogRef<DialogMessageComponent>,
      @Inject(MAT_DIALOG_DATA) public confirmMessageData: DialogMessageData) {}

	public confirm() {
		this.dialogRef.close(ConfirmationResponse.Accept);
	}
}
