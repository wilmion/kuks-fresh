import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowItWorksRoutingModule } from './how-it-works-routing.module';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    HowItWorksRoutingModule
  ]
})
export class HowItWorksModule { }
