import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

import { IUser , IOrder, IDateTime } from '../../../core/models/interfaces';
import { convertDataToString , months} from '../../../core/utils/dateUtils';

@Component({
  selector: 'app-order-root',
  templateUrl: './order-root.component.html',
  styleUrls: ['./order-root.component.scss']
})
export class OrderRootComponent implements OnInit {

  schedules:IOrder[] = [];

  showOrders:IOrder[] = [];

  activedSearch:boolean = true;

  filteresData:filteresData = {
    aprovedsArr : [],
    activeArr: []
  }

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getUsers()
    .subscribe(data => {
      this.convertToSchedules(data);
    },
    error => console.log(error))
  }
  convertToSchedules(users:IUser[]):void {
    const schedules:IOrder[] = [];

    users.forEach(user => {
      const schdls = user.schedules;
      schdls.forEach(schedule => {

        const modifiquedSchedule = {
          ...schedule,
          user_name: user.name
        }
        schedules.push(modifiquedSchedule);
      })
    })

    this.showOrders = schedules;
    this.schedules = this.showOrders;
  }

  //events

  filteredAprovedOrders(event:any):void | null{

    const aproved : boolean = event.target.value === 'true';

    const isNone:boolean = event.target.value === 'none';

    if(isNone){
      this.filteresData.aprovedsArr = [];
      this.resetFilters();
      return null;
    }

    const schedulesFilteredBefore = this.filteresData.activeArr.length === 0? this.schedules : this.filteresData.activeArr;

    const filteredOrders = schedulesFilteredBefore.filter(s => s.pendding === !aproved );

    this.filteresData.aprovedsArr = filteredOrders;

    this.showOrders = filteredOrders;

    
  }

  filteredActiveOrders(event:any):void | null{
    const value:string = event.target.value;
    const actived:boolean = value === 'true';
    const isNone:boolean = value === 'none';

    const dateA:Date = new Date();

    if(isNone){
      this.filteresData.activeArr = [];
      this.resetFilters();
      return null;
    }

    const schedulesFilteredBefore = this.filteresData.aprovedsArr.length === 0? this.schedules : this.filteresData.aprovedsArr;
    if(actived){
      const filteredOrders = schedulesFilteredBefore.filter(s =>
        s.date.date >= dateA.getDate() 
        && months.indexOf(s.date.month) >= dateA.getMonth() 
        && s.date.year >= dateA.getFullYear()
      )

      this.filteresData.activeArr = filteredOrders;
      this.showOrders = filteredOrders;

    }else {
      const filteredOrders = schedulesFilteredBefore.filter(s =>
        s.date.date <= dateA.getDate() 
        && months.indexOf(s.date.month) <= dateA.getMonth() 
        && s.date.year <= dateA.getFullYear()
      )

      this.filteresData.activeArr = filteredOrders;
      this.showOrders = filteredOrders;
    }

    
  }

  filteredSearch(event:any):void {
    const value:string = event.target.value.toLowerCase();

    if(this.activedSearch){
      const filters = this.filteresData;
      const isFiltersAply = filters.activeArr.length !== 0 && filters.aprovedsArr.length !== 0;
      const orders:IOrder[] = isFiltersAply? [...filters.activeArr , ...filters.aprovedsArr] : this.schedules;

      this.showOrders = orders.filter(s => 
        String(s.id).toLowerCase().includes(value) 
        || s.user_name.toLowerCase().includes(value)
        || s.location.city.toLowerCase().includes(value)
        || s.location.country.toLowerCase().includes(value));
    }

   
  }

  resetFilters():void{
    const filters = this.filteresData;

    if(filters.activeArr.length === 0 && filters.aprovedsArr.length === 0){
      this.showOrders = this.schedules;
    }
    
  }

  changeActivateSearch():void {
    this.activedSearch = !this.activedSearch;
  }

  //computed

  convertData(dateTime:IDateTime):string {
    return convertDataToString(dateTime);
  }

  getSumTotal():number {
    let sumTotal:number = 0

    this.showOrders.forEach(s => {
      sumTotal += Number(s.total)
    })

    return sumTotal;
  }

  getNOrdersPendding() : IOrder[] {
    const ordersPending = this.showOrders.filter(s => s.pendding === true);
    return ordersPending;
  }
}

interface filteresData {
  aprovedsArr : IOrder[],
  activeArr: IOrder[]
}

//cosas faltantes para terminar para terminar la pagina admin

  //ver detalles (redireccionar a link , manipular la orden seleccionada desde el checkbox)
  //cambiar estada de la orden
  //agregar boton para ir a detalles
  //Indicador cuando no hay ordenes en los filtros