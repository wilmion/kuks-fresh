import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProductsUser } from '@core/models/interfaces';

import {
  removeToCart,
  addToCart,
  removeProduct,
} from '@root/store/cart/cart.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() product: IProductsUser | undefined;

  constructor(private store: Store<{ cart: IProductsUser[] }>) {}

  ngOnInit(): void {}

  //Incrementa la cantidad de productos en 1
  incrementAmount(): void {
    const product: any = { ...this.product };
    delete product.amount;
    this.store.dispatch(addToCart({ product: product }));
  }

  //Borra una unidad el producto
  deleteAmount(): void {
    const product = <IProductsUser>this.product;

    this.store.dispatch(removeToCart({ product: product }));
  }

  //Elimina el producto
  deleteProduct(): void {
    const product: IProductsUser = <IProductsUser>this.product;

    this.store.dispatch(removeProduct({ product: product }));
  }
}
