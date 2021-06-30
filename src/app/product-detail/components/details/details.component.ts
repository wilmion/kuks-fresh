import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IProduct, IProductsUser, IUser } from 'src/app/core/models/interfaces';

import { addToCart } from '@root/store/cart/cart.actions';

import { redirectIsNotAuth } from '@core/utils/redirectIsNotAuth';
import { getDays, getMonths } from '@core/utils/times.util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() product: IProduct | undefined;
  dates: string[] = [];

  constructor(
    private store: Store<{ cart: IProductsUser[]; user: IUser }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDates();
  }

  //Crear dd/mm/yy Day
  createDates(): void {
    //indispensable (No cambiar nada)
    const days = getDays();
    const months = getMonths();
    const date: Date = new Date();

    // getters
    const nowDay: number = date.getDay();
    const nowFecha: number = date.getDate();
    const nowMonth: number = date.getMonth();
    const nowYear: number = date.getFullYear();

    //validations , Valida si va a pasar el mes o el día
    for (let i = 1; i < 5; i++) {
      let day: number = nowDay + i;
      let fecha: number = nowFecha + i;
      let month: number = nowMonth;
      let year: number = nowYear;

      if (day > 7) {
        day = day % 7;
      }
      if (fecha > 28) {
        fecha = fecha % 28; //Residuo
        month += 1;
        if (month > 11) {
          year += 1;
          month = 0;
        }
      }

      const newDate: string = `${days[day]} ${fecha} ${months[month]} ${year}`;
      this.dates.push(newDate);
    }
  }

  // Añade al carrito un producto
  addToCart(): void {
    redirectIsNotAuth(this.store, this.router, () => {
      this.store.dispatch(addToCart({ product: <IProduct>this.product }));
      this.router.navigate(['/cart']);
    });
  }
}
