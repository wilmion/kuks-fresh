import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({
      products : productsReducer , 
      user: userReducer , 
      scheduleConfigs: scheduleConfigReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
