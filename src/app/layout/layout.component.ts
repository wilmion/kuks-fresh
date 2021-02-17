import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiService } from '../core/services/api.service';
import { UpdateStoreService } from '../core/services/updateStore/update-store.service';

import { IProduct, IUser , IScheduleConfigDay } from '../core/models/interfaces';

//store 
import { SET_PRODUCTS } from '../store/products/products.actions';
import { setConfigs } from '../store/scheduleConfig/scheduleConfig.actions';
import { signUp } from '../store/user/user.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  constructor(
    private productsState : Store<{products:IProduct[]}>,
    private userState : Store<{user:IUser}>,
    private schedulesConfigState : Store<{scheduleConfigs:IScheduleConfigDay[]}>,
    private apiService : ApiService,
    private updateService: UpdateStoreService
  ) { 
    
  }

  ngOnInit(): void {
    this.updateService.change$.subscribe(() => {
      this.setProducts();
      this.signUp();
      this.setScheduleConfig();
    });
  }
  setProducts():void{
    this.apiService.getAll()
    .subscribe(data => {
      this.productsState.dispatch(SET_PRODUCTS({ products: data }));
    })
  }
  signUp():void{
    this.apiService.getUser(1)
    .subscribe(data => {
      this.userState.dispatch(signUp({user:data}))
    })
  }
  setScheduleConfig():void{
    this.apiService.getSchedulesConfigDay()
    .subscribe(data => {
      this.schedulesConfigState.dispatch(setConfigs({configs: data}))
    });
  }
}
