import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren : () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: "product/:id",
        loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule)
      },
      {
        path: "checkout/order",
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: "admin/:action",
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: "admin/items/edit/:id",
        loadChildren: () => import('./post-product/post-product.module').then(m => m.PostProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
