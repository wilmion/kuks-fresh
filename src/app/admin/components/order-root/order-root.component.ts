import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api.service';

import {
  IUser,
  IOrder,
  IDateTime,
  IScheduleData,
} from '../../../core/models/interfaces';
import { convertDataToString, months } from '../../../core/utils/dateUtils';

@Component({
  selector: 'app-order-root',
  templateUrl: './order-root.component.html',
  styleUrls: ['./order-root.component.scss'],
})
export class OrderRootComponent implements OnInit {
  schedules: IOrder[] = [];

  showOrders: IOrder[] = [];

  activedSearch: boolean = true;

  filteresData: filteresData = {
    aprovedsArr: [],
    activeArr: [],
  };

  users: IUser[] | undefined;

  currentSelectedOrder: IOrder | undefined;

  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  convertToSchedules(users: IUser[]): void {
    const schedules: IOrder[] = [];

    users.forEach((user) => {
      const schdls = user.shedules;
      schdls.forEach((schedule) => {
        const modifiquedSchedule = {
          ...schedule,
          user_name: user.name,
        };
        schedules.push(modifiquedSchedule);
      });
    });

    this.users = users;

    this.showOrders = schedules;
    this.schedules = this.showOrders;
  }

  //events

  filteredAprovedOrders(event: any): void | null {
    const aproved: boolean = event.target.value === 'true';

    const isNone: boolean = event.target.value === 'none';

    if (isNone) {
      this.filteresData.aprovedsArr = [];
      this.resetFilters();
      return null;
    }

    const schedulesFilteredBefore =
      this.filteresData.activeArr.length === 0
        ? this.schedules
        : this.filteresData.activeArr;

    const filteredOrders = schedulesFilteredBefore.filter(
      (s) => s.pendding === !aproved
    );

    this.filteresData.aprovedsArr = filteredOrders;

    this.showOrders = filteredOrders;
  }

  filteredActiveOrders(event: any): void | null {
    const value: string = event.target.value;
    const actived: boolean = value === 'true';
    const isNone: boolean = value === 'none';

    const dateA: Date = new Date();

    if (isNone) {
      this.filteresData.activeArr = [];
      this.resetFilters();
      return null;
    }

    const schedulesFilteredBefore =
      this.filteresData.aprovedsArr.length === 0
        ? this.schedules
        : this.filteresData.aprovedsArr;
    if (actived) {
      const filteredOrders = schedulesFilteredBefore.filter(
        (s) =>
          s.date.date >= dateA.getDate() &&
          months.indexOf(s.date.month) >= dateA.getMonth() &&
          s.date.year >= dateA.getFullYear()
      );

      this.filteresData.activeArr = filteredOrders;
      this.showOrders = filteredOrders;
    } else {
      const filteredOrders = schedulesFilteredBefore.filter(
        (s) =>
          s.date.date <= dateA.getDate() &&
          months.indexOf(s.date.month) <= dateA.getMonth() &&
          s.date.year <= dateA.getFullYear()
      );

      this.filteresData.activeArr = filteredOrders;
      this.showOrders = filteredOrders;
    }
  }

  filteredSearch(event: any): void {
    const value: string = event.target.value.toLowerCase();

    if (this.activedSearch) {
      const filters = this.filteresData;
      const isFiltersAply =
        filters.activeArr.length !== 0 && filters.aprovedsArr.length !== 0;
      const orders: IOrder[] = isFiltersAply
        ? [...filters.activeArr, ...filters.aprovedsArr]
        : this.schedules;

      this.showOrders = orders.filter(
        (s) =>
          String(s._id).toLowerCase().includes(value) ||
          s.user_name.toLowerCase().includes(value) ||
          s.location.city.toLowerCase().includes(value) ||
          s.location.country.toLowerCase().includes(value)
      );
    }
  }

  resetFilters(): void {
    const filters = this.filteresData;

    if (filters.activeArr.length === 0 && filters.aprovedsArr.length === 0) {
      this.showOrders = this.schedules;
    }
  }

  changeActivateSearch(): void {
    this.activedSearch = !this.activedSearch;
  }

  setCurrentOrder(event: any, order: IOrder): void {
    const el: HTMLInputElement = event.target;
    const inputsCHND: any = document.querySelectorAll('input');

    const inputs: HTMLInputElement[] = [...inputsCHND];

    inputs.forEach((input) => {
      if (input.type === 'checkbox' && input != el) {
        input.checked = false;
      }
    });

    const active: boolean = el.checked;

    if (active) {
      this.currentSelectedOrder = order;
    } else {
      this.currentSelectedOrder = undefined;
    }
    this.asingDetails();
  }

  asingDetails(): void {
    const buttonDetails: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById('detailsAnchor')
    );

    const order = this.currentSelectedOrder;

    if (order) {
      buttonDetails.dataset.href = `/order/${order.user_name}/${order._id}`;
    }
  }

  toggleStateOrder(order: IOrder): void {
    order.pendding = !order.pendding;

    this.isLoading = true;

    if (this.users) {
      const user: IUser = <IUser>(
        this.users.find((u) => u.name === order.user_name)
      );

      const schedule: any = { ...order };

      delete schedule.user_name;

      const schedules: IScheduleData[] = user.shedules.filter(
        (s) => s._id !== schedule._id
      );

      const updateUser: IUser = {
        ...user,
        shedules: [...schedules, schedule],
      };

      this.apiService
        .updateUser(updateUser, updateUser._id as string)
        .subscribe(
          () => {
            this.fetchData();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  fetchData(): void {
    this.isLoading = true;

    this.apiService.getUsers().subscribe(
      (data) => {
        this.convertToSchedules(data.response);
        this.isLoading = false;
      },
      (error) => (this.isLoading = false)
    );
  }

  navigateToOrderDetail(event: any): void {
    const element: HTMLButtonElement = event.target;

    const URL: string = <string>element.dataset.href;

    window.open(URL, '_blank');
  }

  //computed

  convertData(dateTime: IDateTime): string {
    return convertDataToString(dateTime);
  }

  getSumTotal(): number {
    let sumTotal: number = 0;

    this.showOrders.forEach((s) => {
      sumTotal += Number(s.total);
    });

    return sumTotal;
  }

  getNOrdersPendding(): IOrder[] {
    const ordersPending = this.showOrders.filter((s) => s.pendding === true);
    return ordersPending;
  }
}

interface filteresData {
  aprovedsArr: IOrder[];
  activeArr: IOrder[];
}
