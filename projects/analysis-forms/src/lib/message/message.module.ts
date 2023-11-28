import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfiguratorTranslateSharedModule } from 'configurator-core';
import { DialogMessageService } from './dialog-message/dialog-message.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogMessageComponent } from './dialog-message';

@NgModule({
	declarations: [MessageComponent, DialogMessageComponent],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		ConfiguratorTranslateSharedModule,
		MatDialogModule,
	],
	exports: [MessageComponent],
	providers: [DialogMessageService],
})
export class MessageModule {}
