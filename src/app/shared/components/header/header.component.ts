import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { IProductsUser } from 'src/app/core/models/interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart:IProductsUser[] = [];

  constructor(
    private store:Store<{cart:IProductsUser[]}>
  ) {
    this.store.select('cart').subscribe(cart => (this.cart = cart));
  }

  ngOnInit(): void {
  }

}
