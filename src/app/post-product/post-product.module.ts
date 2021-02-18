import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostProductRoutingModule } from './post-product-routing.module';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    PostProductRoutingModule
  ]
})
export class PostProductModule { }
