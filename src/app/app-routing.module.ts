import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

//guards

import { AdminGuardGuard } from './core/guards/admin-guard.guard';
import { LoginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./product-detail/product-detail.module').then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: 'checkout/order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'admin/:action',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuardGuard],
      },
      {
        path: 'admin/items/edit/:id',
        loadChildren: () =>
          import('./post-product/post-product.module').then(
            (m) => m.PostProductModule
          ),
        canActivate: [AdminGuardGuard],
      },
      {
        path: 'order/:user/:id',
        loadChildren: () =>
          import('./order-detail/order-detail.module').then(
            (m) => m.OrderDetailModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'howitworks',
        loadChildren: () =>
          import('./how-it-works/how-it-works.module').then(
            (m) => m.HowItWorksModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact-bussines/contact-bussines.module').then(
            (m) => m.ContactBussinesModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./error404/error404.module').then((m) => m.Error404Module),
      },
    ],
  },
  {
    path: 'auth/:mode',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error404/error404.module').then((m) => m.Error404Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
