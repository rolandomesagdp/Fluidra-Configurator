import { Component } from '@angular/core';
import { FluidraProApp, proApps } from './fluidra-pro-apps';

@Component({
  selector: 'fcp-configurator-logo',
  templateUrl: './configurator-logo.component.html',
  styleUrls: ['./configurator-logo.component.scss']
})
export class ConfiguratorLogoComponent {
   public readonly subApps: FluidraProApp[] = proApps;

   navigate(proApp: FluidraProApp): void {
      window.open(proApp.url, '_blank');
   }
}
