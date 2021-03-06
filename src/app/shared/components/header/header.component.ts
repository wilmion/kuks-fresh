import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';


import { IProductsUser, IUser } from 'src/app/core/models/interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart:IProductsUser[] = [];
  isLogued:boolean = false;
  image:string = ""

  constructor(
    private store:Store<{cart:IProductsUser[] , user:IUser}>
  ) {
    this.store.select('cart').subscribe(cart => (this.cart = cart));
    this.store.select('user').subscribe(user => {
      this.isLogued = user.id !== '-1';
      this.image = user.image;
    })
  }

  ngOnInit(): void {
  }

}
