import { Component, OnInit , Input} from '@angular/core';
import { IProduct } from '../../../core/models/interfaces';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product:IProduct | undefined;
  title:string = 'Title Product Name';
  background:string = "assets/jpg/pakistani chicken platter.jpg";
  imageType:string = "assets/icon/breakfast-icon.svg";
  reviews:number = 0;
  countrys:string[] = ['Country 1' , 'Country 2'];
  cookTime:string = "X - Y";

  //estrellas

  starsActive:number[] = [1];
  starsInactive:number[]= [1,2,3,4];

  constructor() {

  }

  ngOnInit(): void {
    if(this.product){
      this.title = this.product.title;
      this.background = this.product.image;
      switch(this.product.type){
        case "lunch":
          this.imageType = "assets/icon/lunch-icon.svg";
          break;
        case "drinks":
          this.imageType = "assets/icon/drinks-icon.svg";
          break;
        case "breakFast":
          this.imageType = "assets/icon/breakfast-icon.svg";
          break;
        case "Desserts":
          this.imageType = "assets/icon/desert-icon.svg";
          break;
        case "fastFood":
          this.imageType = "assets/icon/fastFood-icon.svg";
          break;
      }

      const reviews = this.product.reviews;

      this.reviews = reviews.one_start + reviews.two_start +reviews.three_start +reviews.for_start +reviews.five_start;
      this.countrys = this.product.from;
      this.cookTime = this.product.time_delivery;

      this.calculateStars(this.product , this.reviews);
    }
  }
  calculateStars(product:IProduct , totalReviews:number):void{
    const reviews = product.reviews;
    const denominador:number = reviews.five_start * 5 + reviews.for_start * 4 + reviews.three_start * 3 +reviews.two_start * 2 +reviews.one_start * 1;
    const puntuation = Math.round(denominador / totalReviews);
    switch(puntuation){
      case 1:
        this.starsActive= [1];
        this.starsInactive=[1,2,3,4]
        break;
      case 2:
        this.starsActive= [1,2];
        this.starsInactive=[1,2,3]
        break;
      case 3:
        this.starsActive= [1,2,3];
        this.starsInactive=[1,2]
        break;
      case 4:
        this.starsActive= [1,2,3,4];
        this.starsInactive=[1]
        break;
      case 5:
        this.starsActive= [1,2,3,4,5];
        this.starsInactive=[];
        break;
    }
  }

}
