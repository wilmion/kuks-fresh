import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

import { IProductsUser } from '../../../core/models/interfaces';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {

  @Input() cart:IProductsUser[] = [];

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {

  }

  calculateTotal() :string {
    const prices:number[] = this.cart.map(p => (p.prices[0].cost * p.amount));

    let sum:number = 0;

    prices.forEach(p => {
      sum += p;
    })

    return sum.toFixed(2);
  }

  redirectToSchedule():void {
    this.router.navigate(['/checkout/order']);
  }

}
