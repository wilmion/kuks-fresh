import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { RootComponent } from './components/root/root.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


@NgModule({
  declarations: [RootComponent, UserDetailComponent],
  imports: [
    CommonModule,
    OrderDetailRoutingModule,
    SharedModule
  ]
})
export class OrderDetailModule { }
