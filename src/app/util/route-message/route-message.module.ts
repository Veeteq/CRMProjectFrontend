import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'src/app/alert/alert.module';
import { RouteMessageComponent } from './route-message.component';



@NgModule({
  declarations: [
    RouteMessageComponent
  ],
  imports: [
    CommonModule,
    AlertModule
  ],
  exports: [
    RouteMessageComponent
  ]
})
export class RouteMessageModule { }
