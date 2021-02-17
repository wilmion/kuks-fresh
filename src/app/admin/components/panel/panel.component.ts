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


  constructor(
    private productsState:Store<{products:IProduct[]}>,
    private router:ActivatedRoute
  ) { 
    this.mapNavigation = [
      {
        icon: "far fa-user",
        text: "My Profile"
      },
      {
        icon: "fas fa-mug-hot",
        text: "Your Items"
      },
      {
        icon: "fas fa-shipping-fast",
        text: "Your Order"
      },
      {
        icon: "far fa-handshake",
        text: "Payment Method"
      }
    ]
  }

  ngOnInit(): void {
    const action: actions = this.getParam();
      this.setFuncionality(action);
  }
  setFuncionality( action: actions ):void{
    if(action === 'items'){

      this.productsState.select('products')
      .subscribe(data => {
        this.data = data;
      })

    }
  }

  //computed
  getParam():actions{
    let param:actions = 'items';
    this.router.params.subscribe(d => {
      param = d.action;
    })
    return param;
  }
}
interface IMapNavigation{
  icon:string;
  text:string;
}

