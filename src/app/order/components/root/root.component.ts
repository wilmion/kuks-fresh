import { Component, OnInit } from '@angular/core';
import { IDateTime, IScheduleConfigDay, IScheduleData , IUser } from 'src/app/core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';
import { Store } from '@ngrx/store';
import { signUp } from '../../../store/user/user.actions';

import { months , getDay }from '../../../core/utils/dateUtils';


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

  constructor(
    private apiService:ApiService,
    private store : Store<{user:IUser , scheduleConfigs:IScheduleConfigDay[]}>
  ) {
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
    //Obtiendo datos del store

    this.store.select('user')
    .subscribe(data => {
      const schedules:IScheduleData[] = data.schedules;
      this.schedules = schedules;
      this.dates = schedules.map(schedule => schedule.date);
      this.user = data;
      this.isLoading = data.email !== 'NONE'
    })
    
    this.store.select('scheduleConfigs')
    .subscribe(data => {
      this.sheduleInformation = data;
      this.isLoading = data.length === 0;
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
        this.store.dispatch(signUp({user : userUpdated}));
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
        id: 0,
        from : configData.from,
        to : configData.to,
        deliveryOff: configData.deliveryOff,
        hourlyRate: configData.hourlyRate,
        repeatWeekly: configData.repeatWeekly,
        available: true,
        finished: false,
        totalHours: TotalHours,
        date: value,
        total: ((TotalHours*configData.hourlyRate)-(TotalHours*configData.repeatWeekly)).toFixed(2),
        pendding: true,
        location: {
          city: "Lima",
          country: "Peru",
          direction: "Mz los pepitos de la wea"
        }
      }
    }
  }
  deleteSchedule(index:number):void{
    this.isLoading = true;

    if(this.user){
      const userUpdated:IUser = {
        ...this.user,
        schedules: this.user.schedules.filter((v , i) => i !== index)
      }

      this.apiService.updateUser(userUpdated)
      .subscribe(data => {
        this.store.dispatch(signUp({user : userUpdated}));
        this.isLoading = false;
      },
      error => console.log(error)
      );
    }
  }

}
