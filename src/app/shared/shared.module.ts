import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProductComponent } from './components/product/product.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent , ProductComponent, ErrorAlertComponent],
  imports: [CommonModule, SharedRoutingModule ],
  exports: [HeaderComponent, FooterComponent , LoadingComponent , ProductComponent , ErrorAlertComponent],
})
export class SharedModule {}
