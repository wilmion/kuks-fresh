import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactBussinesRoutingModule } from './contact-bussines-routing.module';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    ContactBussinesRoutingModule
  ]
})
export class ContactBussinesModule { }
