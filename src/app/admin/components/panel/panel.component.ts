import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { IProduct } from '../../../core/models/interfaces';
import { actions } from '../../../core/models/tuplas';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  //Map

  mapNavigation:IMapNavigation[] = [];

  //datas

  data:IProduct[] = [];
  action:actions = 'items';


  constructor(
    private productsState:Store<{products:IProduct[]}>,
    private router:ActivatedRoute
  ) { 
    this.mapNavigation = [
      {
        icon: "far fa-user",
        text: "My Profile",
        param: "profile"
      },
      {
        icon: "fas fa-mug-hot",
        text: "Your Items",
        param: "items"
      },
      {
        icon: "fas fa-shipping-fast",
        text: "Your Order",
        param: "orders"
      },
      {
        icon: "far fa-handshake",
        text: "Payment Method",
        param : "payments"
      }
    ]
  }

  ngOnInit(): void {
    
    this.router.params.subscribe(d => {
      this.action = d.action;
      this.setFuncionality(this.action);
    })
  }
  setFuncionality( action: actions ):void{
    if(action === 'items'){

      this.productsState.select('products')
      .subscribe(data => {
        this.data = data;
      })

    }
  }
}
interface IMapNavigation{
  icon:string;
  text:string;
  param:actions
}

