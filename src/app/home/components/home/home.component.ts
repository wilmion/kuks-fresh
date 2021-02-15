import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProduct } from '../../../core/models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:IProduct[] | undefined ;
  showFilters:boolean = false;
  typeActive: "lunch" | "drinks" | "breakFast" |"Desserts" | "fastFood" | "all" = "all";
  productsShow: IProduct[] | undefined | [] = [];
  productsSort:IProduct[] | undefined;
  productsFiltered:IProduct[] | undefined | [] = [];
  isLoading:boolean = true;
  showFiltersOptions:boolean = false;

  constructor(
    private store:Store<{products: IProduct[]}>
  ) { 
    store.select('products').subscribe(data => {
      this.products = data; 
      this.filteredPopular([...data]);   
      this.isLoading = data.length === 0;
    });
  }
  
  ngOnInit(): void {
  }
  filteredPopular(products:IProduct[]):void{
    const productSort = products.sort((a:IProduct , b:IProduct) => {
      const reviewsA = a.reviews.one_start + a.reviews.two_start + a.reviews.three_start+ a.reviews.for_start +a.reviews.five_start;
      const reviewsB = b.reviews.one_start + b.reviews.two_start + b.reviews.three_start+ b.reviews.for_start +b.reviews.five_start;

      return reviewsB - reviewsA;
    });
    this.productsSort = [ productSort[0] , productSort[1] , productSort[2] ];

   
  }

  searchProduct(e:any):void{ 
    const value:string = e.target.value;
    if(this.products){
      const filteredValues = this.products.filter(item => item.title.toLowerCase().includes(value.toLocaleLowerCase()));
      this.productsShow = filteredValues;
    }
  }

  toggleFiltered():void {
    this.showFilters = !this.showFilters;
    console.log(this.showFilters);
  }

  filterType(type: "lunch" | "drinks" | "breakFast" |"Desserts" | "fastFood" | "all"):void{
    if(this.products){
      const filtered = this.products.filter(item => item.type === type);
      this.productsFiltered = filtered;
      this.typeActive = type;
    }
    
  }

  toggleFiltersOptions():void {
    this.showFiltersOptions = !this.showFiltersOptions;
  }

}
