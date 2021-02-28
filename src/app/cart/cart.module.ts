import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { RootComponent } from './components/root/root.component';
import { ItemComponent } from './components/item/item.component';
import { TotalsComponent } from './components/totals/totals.component';


@NgModule({
  declarations: [RootComponent, ItemComponent, TotalsComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
