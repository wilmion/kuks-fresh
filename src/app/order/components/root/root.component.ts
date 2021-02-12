import { Component, OnInit } from '@angular/core';
import { IDateTime, IScheduleData } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  dateActual:IDateTime;
  schedules:IScheduleData[] = [];

  constructor() {
    this.dateActual= {
      year: 2021,
      month: 'Jun',
      date: 12,
      day: 'Monday'
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
    }
    
  }

  setDateTime(value:IDateTime):void{
    this.dateActual = value;
  }

}
