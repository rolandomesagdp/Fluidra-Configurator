import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '../layout';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
   declarations: [
      AdminComponent,
      HomeComponent
   ],
   imports: [
      AdminRoutingModule,
      CommonModule,
      LayoutModule
   ]
})
export default class AdminModule { }