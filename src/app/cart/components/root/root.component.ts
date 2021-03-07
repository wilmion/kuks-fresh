import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IProductsUser, IUser } from 'src/app/core/models/interfaces';
import { redirectIsNotAuth } from 'src/app/core/utils/redirectIsNotAuth';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  cart:IProductsUser[] = []

  constructor(
    private store:Store<{cart:IProductsUser[] , user:IUser}>
  ) {
    this.store.select('cart').subscribe(cart => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

}
