import { Component, OnInit } from '@angular/core';
import { IDateTime, IScheduleData } from 'src/app/core/models/interfaces';

import { months , getDay }from '../../../core/utils/dateUtils';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  dateActual:IDateTime;
  dates:IDateTime[] = [];
  schedules:IScheduleData[] = [];

  constructor() {
    const date:Date = new Date();
    const datefirstMonth:Date = new Date(date.getFullYear() , date.getMonth() , 1);
    this.dateActual= {
      year: date.getFullYear(),
      month: months[date.getMonth()],
      date: date.getDate() + 1,
      day: getDay(date.getDate() + 1 , datefirstMonth.getDay())
    }
  }

  ngOnInit(): void {
  }

  addSchedule(value:IScheduleData):void{
    const valueRefined:IScheduleData = {
      ...value,
      finished: true
    }
    const scheduleDateExist = this.schedules.find(schedule => schedule.date === valueRefined.date);
    if(!scheduleDateExist){
      this.schedules.push(valueRefined);
      this.dates.push(valueRefined.date);
    }
    
  }

  setDateTime(value:IDateTime):void{
    this.dateActual = value;
  }

}
