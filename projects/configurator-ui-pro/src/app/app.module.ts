import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfiguratorComponentsModule } from 'configurator-components';
import { ConfiguratorCoreModule } from 'configurator-core';
import { UserFormModule } from './user-form';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    ConfiguratorComponentsModule,
    ConfiguratorCoreModule,
    UserFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
