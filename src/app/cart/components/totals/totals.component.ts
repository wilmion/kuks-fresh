import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IProductsUser, IUser } from '../../../core/models/interfaces';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {

  @Input() cart:IProductsUser[] = [];
  user:IUser | undefined
  error: string = "";

  constructor(
    private router:Router,
    private store:Store<{user:IUser}>
  ) { }

  ngOnInit(): void {
    this.store.select('user').subscribe(user => (this.user = user));
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
    if(this.user){
      this.error = "";
      const validate:boolean = 
        this.user.city != 'Not Defined' &&
        this.user.country != 'Not Defined' &&
        this.user.direction != 'Not Defined' &&
        this.user.dni != 'Not Defined' &&
        this.user.phoneNumber != 'Not Defined' &&
        this.user.houseNumber != 'Not Defined';
      
      if(validate){
        this.router.navigate(['/checkout/order']);
      }else {
        this.error ='Fill in your address information in the path "/profile"';     
      }
    }
    
    
  }

}
