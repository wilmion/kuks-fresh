import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { RootComponent } from './components/root/root.component';
import { ScheduleComponent } from './components/schedule/schedule.component';


@NgModule({
  declarations: [RootComponent, ScheduleComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
