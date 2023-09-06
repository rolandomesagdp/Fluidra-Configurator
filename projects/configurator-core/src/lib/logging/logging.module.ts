import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ LoggingService ]
})
export class LoggingModule { }
