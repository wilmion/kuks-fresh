import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { IntroComponent } from './components/intro/intro.component';
import { OptionFilterComponent } from './components/option-filter/option-filter.component';


@NgModule({
  declarations: [HomeComponent, ProductComponent, IntroComponent, OptionFilterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
