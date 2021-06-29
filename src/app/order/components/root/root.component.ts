import { Component, OnInit } from '@angular/core';
import {
  IDateTime,
  IProductsUser,
  IScheduleConfigDay,
  IScheduleData,
  IUser,
} from 'src/app/core/models/interfaces';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api.service';
import { Store } from '@ngrx/store';
import { signUp } from '../../../store/user/user.actions';
import { clearCart } from '../../../store/cart/cart.actions';

import { months, getDay } from '../../../core/utils/dateUtils';
import { writeLocalStorage } from '../../../core/utils/generateLocal';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  dateActual: IDateTime;
  scheduleConfigActual: IScheduleData | undefined;

  sheduleInformation: IScheduleConfigDay[] = [];
  dates: IDateTime[] = [];
  schedules: IScheduleData[] = [];

  //UI
  isLoading: boolean = false;
  error: string = '';
  //Store
  user: IUser | undefined;
  cart: IProductsUser[] = [];

  constructor(
    private apiService: ApiService,
    private store: Store<{
      user: IUser;
      scheduleConfigs: IScheduleConfigDay[];
      cart: IProductsUser[];
    }>
  ) {
    const date: Date = new Date();
    const datefirstMonth: Date = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
    this.dateActual = {
      year: date.getFullYear(),
      month: months[date.getMonth()],
      date: date.getDate() + 1,
      day: getDay(date.getDate() + 1, datefirstMonth.getDay()),
    };
  }

  ngOnInit(): void {
    //Obtiendo datos del store

    this.store.select('user').subscribe((data) => {
      const schedules: IScheduleData[] = data.shedules;
      this.schedules = schedules;
      this.dates = schedules.map((schedule) => schedule.date);
      this.user = data;
      this.isLoading = data.email !== 'NONE';
    });

    this.store.select('scheduleConfigs').subscribe((data) => {
      this.sheduleInformation = data;
      this.isLoading = data.length === 0;
    });

    this.store.select('cart').subscribe((data) => {
      this.cart = data;
    });
  }

  addSchedule(value: IScheduleData): void {
    this.error = '';
    const valueRefined: IScheduleData = {
      ...value,
      finished: true,
    };
    const scheduleDateExist = this.schedules.find(
      (schedule) =>
        schedule.date.date == valueRefined.date.date &&
        schedule.date.year == new Date().getFullYear() &&
        schedule.date.month === valueRefined.date.month
    );

    if (!scheduleDateExist && this.user && this.cart.length !== 0) {
      this.isLoading = true;
      const userUpdated: IUser = {
        ...this.user,
        shedules: [valueRefined],
      };
      this.apiService
        .updateUser(userUpdated, this.user._id as string)
        .subscribe(
          (data) => {
            this.store.dispatch(signUp({ user: userUpdated }));
            writeLocalStorage('user', userUpdated);
            this.isLoading = false;

            this.store.dispatch(clearCart());
          },
          (error) => (this.isLoading = false)
        );
    } else {
      this.error =
        'The schedule with the same date has already been established or you have no products in your cart';
    }
  }

  setDateTime(value: IDateTime): void {
    this.dateActual = value;
    const configData: IScheduleConfigDay | undefined =
      this.sheduleInformation.find((e) => e.day === value.day);
    if (configData && this.user) {
      const TotalHours: number = configData.to - configData.from;

      this.scheduleConfigActual = {
        from: configData.from,
        to: configData.to,
        deliveryOff: configData.deliveryOff,
        hourlyRate: configData.hourlyRate,
        repeatWeekly: configData.repeatWeekly,
        available: true,
        finished: false,
        totalHours: TotalHours,
        date: value,
        total: (
          TotalHours * configData.hourlyRate -
          TotalHours * configData.repeatWeekly
        ).toFixed(2),
        pendding: true,
        location: {
          city: this.user.city,
          country: this.user.country,
          direction: this.user.direction,
        },
        products: [...this.cart],
      };
    }
  }

  deleteSchedule(index: number): void {
    this.isLoading = true;
    this.error = '';
    if (this.user) {
      const userUpdated: IUser = {
        ...this.user,
        shedules: this.user.shedules.filter((v, i) => i !== index),
      };

      this.apiService
        .updateUser(userUpdated, this.user._id as string)
        .subscribe(
          (data) => {
            this.store.dispatch(signUp({ user: userUpdated }));
            this.isLoading = false;
            writeLocalStorage('user', userUpdated);
          },
          (error) => console.log(error)
        );
    }
  }
}
