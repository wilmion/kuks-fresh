import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UpdateStoreService } from '../../../core/services/updateStore/update-store.service';
import { ApiService } from '../../../core/services/api.service';
import { IProduct } from '../../../core/models/interfaces';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  @Input() product: IProduct | undefined;

  //map

  starsActive: number[] = [1];
  starsInactive: number[] = [1, 2, 3, 4];

  constructor(
    private router: Router,
    private updateStoreService: UpdateStoreService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.calculateStars(this.product, this.getTotalReviews());
    }
  }
  calculateStars(product: IProduct, totalReviews: number): void {
    const reviews = product.reviews;
    const denominador: number =
      reviews.five_start * 5 +
      reviews.for_start * 4 +
      reviews.three_start * 3 +
      reviews.two_start * 2 +
      reviews.one_start * 1;
    const puntuation = Math.round(denominador / totalReviews);
    switch (puntuation) {
      case 1:
        this.starsActive = [1];
        this.starsInactive = [1, 2, 3, 4];
        break;
      case 2:
        this.starsActive = [1, 2];
        this.starsInactive = [1, 2, 3];
        break;
      case 3:
        this.starsActive = [1, 2, 3];
        this.starsInactive = [1, 2];
        break;
      case 4:
        this.starsActive = [1, 2, 3, 4];
        this.starsInactive = [1];
        break;
      case 5:
        this.starsActive = [1, 2, 3, 4, 5];
        this.starsInactive = [];
        break;
    }
  }

  refresh(): void {
    this.updateStoreService.updated();
  }
  removeProduct(): void | null {
    if (!this.product) return null;
    const productId: string = this.product._id as string;

    this.apiService.deleteProduct(productId).subscribe(
      () => {
        this.updateStoreService.updated();
      },
      (error) => console.log(error)
    );
  }
  editProduct(): void | null {
    if (!this.product) return null;

    const url: string = `/admin/items/edit/${this.product._id}`;

    this.router.navigate([url]);
  }
  //computed

  getTotalReviews(): number {
    if (!this.product) return 0;
    const p: IProduct = this.product;
    const total: number =
      p.reviews.one_start +
      p.reviews.two_start +
      p.reviews.three_start +
      p.reviews.for_start +
      p.reviews.five_start;
    return total;
  }
}
