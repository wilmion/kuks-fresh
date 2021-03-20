import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule }  from '../shared/shared.module';

import { CartRoutingModule } from './cart-routing.module';
import { RootComponent } from './components/root/root.component';
import { ItemComponent } from './components/item/item.component';
import { TotalsComponent } from './components/totals/totals.component';
import { ItemRdComponent } from './components/item-rd/item-rd.component';


@NgModule({
  declarations: [RootComponent, ItemComponent, TotalsComponent, ItemRdComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
