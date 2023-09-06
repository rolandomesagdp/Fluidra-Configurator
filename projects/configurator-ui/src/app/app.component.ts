import { Component } from '@angular/core';
import { LoggingService } from 'configurator-core';

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'configurator-ui';

  constructor(private logger: LoggingService) {
    this.logger.log("Hello world Configurator");
  }
}
