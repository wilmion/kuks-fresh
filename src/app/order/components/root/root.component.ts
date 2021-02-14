import { Component, OnInit } from '@angular/core';
import { IDateTime, IScheduleConfigDay, IScheduleData , IUser } from 'src/app/core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';
import { Store } from '@ngrx/store';

import { months , getDay }from '../../../core/utils/dateUtils';

import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  dateActual:IDateTime;
  scheduleConfigActual:IScheduleData | undefined;

  
  sheduleInformation:IScheduleConfigDay[] = [];
  dates:IDateTime[] = [];
  schedules:IScheduleData[] = [];

  //UI
  isLoading:boolean = false;
  //provisional
  user:IUser | undefined;
  count$:Observable<number>

  constructor(
    private apiService:ApiService,
    private store : Store<{count:number}>
  ) {
    const date:Date = new Date();
    const datefirstMonth:Date = new Date(date.getFullYear() , date.getMonth() , 1);
    this.dateActual= {
      year: date.getFullYear(),
      month: months[date.getMonth()],
      date: date.getDate() + 1,
      day: getDay(date.getDate() + 1 , datefirstMonth.getDay())
    }
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getUser(1)
    .subscribe(data => {
      const schedules:IScheduleData[] = data.schedules;
      this.schedules = schedules;
      this.dates = schedules.map(schedule => schedule.date);
      this.user = data;
      this.isLoading = false;
    })
    
    this.apiService.getSchedulesConfigDay()
    .subscribe(data => {
      this.sheduleInformation=data;
      this.isLoading = false;
    });

  }

  addSchedule(value:IScheduleData):void{
    const valueRefined:IScheduleData = {
      ...value,
      finished: true
    }
    const scheduleDateExist = this.schedules.find(
      schedule => schedule.date.date == valueRefined.date.date &&
      schedule.date.year == new Date().getFullYear() && 
      schedule.date.month === valueRefined.date.month
    );

    if(!scheduleDateExist && this.user){
      this.isLoading = true;
      const userUpdated:IUser = {
        ...this.user,
        id:2,
        schedules: [
          ...this.user.schedules,
          valueRefined
        ]
      }
      this.apiService.updateUser(userUpdated)
      .subscribe(data => {
        this.schedules.push(valueRefined);
        this.dates.push(valueRefined.date);
        this.isLoading = false;
      },
      error => this.isLoading = false)
    }

    
  }

  setDateTime(value:IDateTime):void{
    this.dateActual = value;
    const configData:IScheduleConfigDay | undefined = this.sheduleInformation.find(e => e.day === value.day);
    if(configData){
      const TotalHours:number = configData.to - configData.from;
      this.scheduleConfigActual = {
        from : configData.from,
        to : configData.to,
        deliveryOff: configData.deliveryOff,
        hourlyRate: configData.hourlyRate,
        repeatWeekly: configData.repeatWeekly,
        available: true,
        finished: false,
        totalHours: TotalHours,
        date: value,
        total: ((TotalHours*configData.hourlyRate)-(TotalHours*configData.repeatWeekly)).toFixed(2)
      }
    }
  }
  deleteSchedule(value:IScheduleData):void{
    this.isLoading = true;
    const index:number = this.schedules.indexOf(value);
    this.schedules.splice(index , 1);

    if(this.user){
      const userUpdated:IUser = {
        ...this.user,
        id:2,
        schedules: this.user.schedules
      }

      this.apiService.updateUser(userUpdated)
      .subscribe(data => {
        this.isLoading = false;
      },
      error => console.log(error)
      );
    }
  }

}
