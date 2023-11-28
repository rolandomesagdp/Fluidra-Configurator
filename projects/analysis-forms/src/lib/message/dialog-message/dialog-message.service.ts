import { Injectable } from '@angular/core';
import { DialogMessageData } from './dialog-message-data';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationResponse } from './dialog-message-response.enum';
import { DialogMessageComponent } from './dialog-message.component';

@Injectable()
export class DialogMessageService {
   get dialogId(): string {
      return "confirm_message_dialog";
   }
   
   constructor(public dialog: MatDialog) { }

   public confirm(data: DialogMessageData): Observable<ConfirmationResponse> {

      const dialogRef = this.dialog.open(DialogMessageComponent, {
         id: this.dialogId,
         width: data.width,
         data: data
      });

      return dialogRef.afterClosed();
   }
}
