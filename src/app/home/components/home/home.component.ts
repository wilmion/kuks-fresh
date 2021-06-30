import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProduct } from '@core/models/interfaces';
import { FiltersProducts } from '@core/models/tuplas';

import {
  searchByTitleProduct,
  sortProductByStars,
} from '@core/utils/products.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] | undefined;
  showFilters: boolean = false;
  typeActive: FiltersProducts = 'all';
  productsShow: IProduct[] | undefined | [] = [];
  productsSort: IProduct[] | undefined;
  productsFiltered: IProduct[] | undefined | [] = [];
  isLoading: boolean = true;
  showFiltersOptions: boolean = false;

  //Un simple constructor
  constructor(private store: Store<{ products: IProduct[] }>) {
    store.select('products').subscribe((data) => {
      this.products = data;
      this.filteredPopular([...data]);
      this.isLoading = data.length === 0;
    });
  }

  ngOnInit(): void {}

  //Devuelve los productos más populares por estrellas.
  filteredPopular(products: IProduct[]): void {
    const productSort = sortProductByStars(products);
    this.productsSort = [productSort[0], productSort[1], productSort[2]];
  }

  //Busca un producto
  searchProduct(e: any): void {
    const value: string = e.target.value;
    if (this.products) {
      this.productsShow = searchByTitleProduct(this.products, value);
    }
  }

  // Muestra/Oculta los filtros
  toggleFiltered(): void {
    this.showFilters = !this.showFilters;
    //console.log(this.showFilters);
  }

  // Filtra productor por su tipo
  filterType(type: FiltersProducts): void {
    if (this.products) {
      const filtered = this.products.filter((item) => item.type === type);
      this.productsFiltered = filtered;
      this.typeActive = type;
    }
  }

  //Muestra / Oculta las opciones de filtros
  toggleFiltersOptions(): void {
    this.showFiltersOptions = !this.showFiltersOptions;
  }
}
