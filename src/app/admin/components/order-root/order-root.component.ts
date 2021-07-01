import { Component, OnInit } from '@angular/core';

import { IUser, IOrder, IDateTime } from '@core/models/interfaces';

import { ApiService } from '@core/services/api.service';

import { convertDataToString, months } from '@core/utils/dateUtils';
import { convertScheduleToOrder } from '@core/utils/schedules.util';

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

  //Convierte los schedules a ordenes
  convertToSchedules(users: IUser[]): void {
    const schedules: IOrder[] = [];

    users.forEach((user) => {
      const schdls = user.shedules;
      schdls.forEach((schedule) => {
        schedules.push(
          convertScheduleToOrder(schedule, user.name, user._id as string)
        );
      });
    });

    this.users = users;

    this.showOrders = schedules;
    this.schedules = this.showOrders;
  }

  // Obtiene todos los usuarios del backend
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

  // Filtra si la ordén esta aprovada
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

  // Filtra por Actividad de la ordén
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

  // Filtra por busquedad
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

  // Resetea los filtros
  resetFilters(): void {
    const filters = this.filteresData;

    if (filters.activeArr.length === 0 && filters.aprovedsArr.length === 0) {
      this.showOrders = this.schedules;
    }
  }

  // Activa / Desactiva la busqueda
  changeActivateSearch(): void {
    this.activedSearch = !this.activedSearch;
  }

  // Selecciona la orden
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

    this.currentSelectedOrder = active ? order : undefined;

    this.asingDetails();
  }

  // Anticipa el boton para cuando quieras ver los detalles de la ordén
  asingDetails(): void {
    const buttonDetails = document.getElementById(
      'detailsAnchor'
    ) as HTMLButtonElement;
    const order = this.currentSelectedOrder;

    if (order) {
      buttonDetails.dataset.href = `/order/${order.user_id}/${order._id}`;
    }
  }

  // Cambia el estado de la ordén desde el backend
  toggleStateOrder(order: IOrder): void {
    order.pendding = !order.pendding;

    this.isLoading = true;

    if (this.users) {
      const schedule: any = { ...order };

      delete schedule.user_name;

      this.apiService.updateSchedule(schedule._id, schedule).subscribe(() => {
        this.fetchData();
      });
    }
  }

  // Va a los detalles de la orden
  navigateToOrderDetail(event: any): void {
    const element: HTMLButtonElement = event.target;

    const URL: string = <string>element.dataset.href;

    window.open(URL, '_blank');
  }

  //Convierte fechas a un string
  convertData(dateTime: IDateTime): string {
    return convertDataToString(dateTime);
  }

  // Retona la suma total
  getSumTotal(): number {
    let sumTotal: number = 0;

    this.showOrders.forEach((s) => {
      sumTotal += Number(s.total);
    });

    return sumTotal;
  }

  // Filtra por ordenes que sobrán
  getNOrdersPendding(): IOrder[] {
    const ordersPending = this.showOrders.filter((s) => s.pendding === true);
    return ordersPending;
  }
}

interface filteresData {
  aprovedsArr: IOrder[];
  activeArr: IOrder[];
}
