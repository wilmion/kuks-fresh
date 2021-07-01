import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '@core/models/interfaces';

import { UpdateStoreService } from '@core/services/updateStore/update-store.service';
import { ApiService } from '@core/services/api.service';

import { calculateStars, sumStarsProduct } from '@core/utils/products.util';

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
      this.calculateStars(this.product);
    }
  }
  // Calcula la calificacion del producto
  calculateStars(product: IProduct): void {
    const [active, inactive] = calculateStars(product);
    this.starsActive = active;
    this.starsInactive = inactive;
  }

  // Actualiza el store
  refresh(): void {
    this.updateStoreService.updated();
  }

  // Elimina un producto
  removeProduct(): void | null {
    if (!this.product) return null;
    const productId = this.product._id as string;

    this.apiService.deleteProduct(productId).subscribe(
      () => {
        this.updateStoreService.updated();
      },
      (error) => console.log(error)
    );
  }

  // Envia al admin a la página de editamiento del producto
  editProduct(): void | null {
    if (!this.product) return null;

    const url: string = `/admin/items/edit/${this.product._id}`;

    this.router.navigate([url]);
  }

  // Retorna el total de reviews
  getTotalReviews(): number {
    if (!this.product) return 0;
    const total: number = sumStarsProduct(this.product.reviews);
    return total;
  }
}
