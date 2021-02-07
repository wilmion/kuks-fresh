import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { RootComponent } from './components/root/root.component';
import { DetailsComponent } from './components/details/details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RootComponent, DetailsComponent],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    SharedModule
  ]
})
export class ProductDetailModule { }
