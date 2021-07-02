import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { IProduct } from '@core/models/interfaces';
import { searchByIdProduct } from '@core/utils/products.util';
import { setTitle } from '@core/utils/setTitle.util';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  product: IProduct | undefined;
  isLoading: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private store: Store<{ products: IProduct[] }>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.router.params.subscribe((param: Params) => {
      const id: string = param.id;
      this.getProduct(id);
    });
  }

  //Obtiene el producto
  getProduct(id: string): void {
    this.store.select('products').subscribe((data) => {
      this.product = searchByIdProduct(data, id);
      this.isLoading = data.length === 0;
      if (this.product) setTitle(this.product.title);
    });
  }
}
