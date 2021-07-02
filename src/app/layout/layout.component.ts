import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiService } from '../core/services/api.service';
import { UpdateStoreService } from '../core/services/updateStore/update-store.service';

import { IProduct, IUser, IScheduleConfigDay } from '../core/models/interfaces';

//store
import { SET_PRODUCTS } from '../store/products/products.actions';
import { setConfigs } from '../store/scheduleConfig/scheduleConfig.actions';
import { signUp } from '../store/user/user.actions';
import {
  getItemLocalStorage,
  writeLocalStorage,
} from '../core/utils/generateLocal';
import { updateUserData } from '@core/utils/store.util';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private productsState: Store<{ products: IProduct[] }>,
    private userState: Store<{ user: IUser }>,
    private schedulesConfigState: Store<{
      scheduleConfigs: IScheduleConfigDay[];
    }>,
    private apiService: ApiService,
    private updateService: UpdateStoreService
  ) {}

  ngOnInit(): void {
    this.updateService.change$.subscribe(() => {
      this.setProducts();
      this.setScheduleConfig();
    });
    this.signUp();
  }

  // Obtiene todos los productos
  setProducts(): void {
    this.apiService.getAll().subscribe((data) => {
      this.productsState.dispatch(SET_PRODUCTS({ products: data.response }));
    });
  }

  // Obtener el usuario
  signUp(): void {
    const userAuth: null | string = getItemLocalStorage('user');
    if (userAuth) {
      const user: IUser = JSON.parse(userAuth);

      this.userState.dispatch(signUp({ user }));

      updateUserData(this.apiService, user.email, this.userState);
    }
  }

  // GetScheduleConfigs
  setScheduleConfig(): void {
    this.apiService.getSchedulesConfigDay().subscribe((data) => {
      this.schedulesConfigState.dispatch(
        setConfigs({ configs: data.response })
      );
    });
  }
}
