import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { PanelComponent } from './components/panel/panel.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';


@NgModule({
  declarations: [NavMenuComponent, PanelComponent, ContentComponent, FooterComponent, ProductAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
