import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IProductsUser, IUser } from '@core/models/interfaces';

import { validate_is_auth } from '@core/utils/auth.util';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
})
export class TotalsComponent implements OnInit {
  @Input() cart: IProductsUser[] = [];
  user: IUser | undefined;
  error: string = '';

  constructor(private router: Router, private store: Store<{ user: IUser }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => (this.user = user));
  }

  //Calcula el total de todos los productos
  calculateTotal(): string {
    const prices: number[] = this.cart.map((p) => p.prices[0].cost * p.amount);

    let sum: number = 0;

    prices.forEach((p) => {
      sum += p;
    });

    return sum.toFixed(2);
  }

  //Redirecciona al hacer click
  redirectToSchedule(): void {
    if (this.user) {
      this.error = '';
      const validate: boolean = validate_is_auth(this.user);

      if (validate) {
        this.router.navigate(['/checkout/order']);
      } else {
        this.error = 'Fill in your address information in the path "/profile"';
      }
    }
  }
}
