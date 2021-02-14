import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { RootComponent } from './components/root/root.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HorarioComponent } from './components/horario/horario.component';


@NgModule({
  declarations: [RootComponent, ScheduleComponent, HorarioComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
