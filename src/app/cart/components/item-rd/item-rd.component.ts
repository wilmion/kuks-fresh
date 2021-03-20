import { Component, OnInit , Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { removeToCart , addToCart , removeProduct} from '../../../store/cart/cart.actions';

import { IProductsUser } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-item-rd',
  templateUrl: './item-rd.component.html',
  styleUrls: ['./item-rd.component.scss']
})
export class ItemRdComponent implements OnInit {

  @Input() product:IProductsUser | undefined;

  constructor(
    private store:Store<{cart:IProductsUser[]}>
  ) { }

  ngOnInit(): void {
  }

  incrementAmount():void{
    const product:any = {...this.product};
    delete product.amount;
    this.store.dispatch(addToCart({product : product}))
  }
  deleteAmount():void{
    const product = <IProductsUser> this.product;

    this.store.dispatch(removeToCart({product:product}));
  }
  deleteProduct():void {
    const product:IProductsUser = <IProductsUser> this.product;

    this.store.dispatch(removeProduct({product:product}));
  }

}
