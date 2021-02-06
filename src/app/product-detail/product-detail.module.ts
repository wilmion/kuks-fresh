import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { RootComponent } from './components/root/root.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
  declarations: [RootComponent, DetailsComponent],
  imports: [
    CommonModule,
    ProductDetailRoutingModule
  ]
})
export class ProductDetailModule { }
