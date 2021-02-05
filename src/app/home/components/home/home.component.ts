import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../core/models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  product:IProduct = {
    id:1,
    image: "assets/jpg/arabic mandi.jpg",
    title: "Pakistani Chicken Platter",
    reviews: {
        five_start: 5,
        for_start: 3,
        three_start: 1,
        two_start: 20,
        one_start: 0
    },
    prices: [
      {
        cost: 45,
        moneda: "$"
      }
    ],
    from:["Indian","Pakistani"],
    time_delivery: "10-20",
    type: "lunch",
    kitchen: ["asian" , "peruvian"],
    ingredients: ["tomato" , "apple" , "water"],
    subtitle: "subtitle PRODUCT",
    diet_info:["gluten"],
    dietary_restricion: ["Organic"],
    descriptions:{
        product: "Description....",
        portion: "Description porcion..."
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
