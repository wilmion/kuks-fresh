import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '@core/models/interfaces';

import {
  calculateStars,
  getImageByTypeProduct,
  sumStarsProduct,
} from '@core/utils/products.util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct | undefined;
  imageType: string = 'assets/icon/breakfast-icon.svg';
  reviews: number = 0;
  countrys: string[] = ['Country 1', 'Country 2'];
  cookTime: string = 'X - Y';

  //estrellas

  starsActive: number[] = [1];
  starsInactive: number[] = [1, 2, 3, 4];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.product) {
      this.imageType = getImageByTypeProduct(this.product);

      const reviews = this.product.reviews;

      this.reviews = sumStarsProduct(reviews);
      this.countrys = this.product.from;
      this.cookTime = this.product.time_delivery;

      this.calculateStars(this.product);
    }
  }

  //Calcula la calificación del producto
  calculateStars(product: IProduct): void {
    const [active, inactive] = calculateStars(product);
    this.starsActive = active;
    this.starsInactive = inactive;
  }
  redirectTo(): void {
    if (this.product) {
      this.router.navigate([`/product/${this.product._id}`]);
    }
  }
}
