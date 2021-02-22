import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module'

import { AdminRoutingModule } from './admin-routing.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { PanelComponent } from './components/panel/panel.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ProfileRootComponent } from './components/profile-root/profile-root.component';
import { OrderRootComponent } from './components/order-root/order-root.component';


@NgModule({
  declarations: [NavMenuComponent, PanelComponent, ContentComponent, FooterComponent, ProductAdminComponent, PaymentMethodComponent, ProfileRootComponent, OrderRootComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
