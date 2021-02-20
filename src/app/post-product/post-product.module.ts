import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { PostProductRoutingModule } from './post-product-routing.module';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    PostProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostProductModule { }
