import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//modules
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

//components
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

//state
import { productsReducer } from './store/products/products.reducer';
import { userReducer } from './store/user/user.reducers';
import { scheduleConfigReducer } from './store/scheduleConfig/scheduleConfig.reducers';
import { cartReducer } from './store/cart/cart.reducers';

//Interceptors

import { HttpService } from './http.interceptor';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({
      products: productsReducer,
      user: userReducer,
      scheduleConfigs: scheduleConfigReducer,
      cart: cartReducer,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
