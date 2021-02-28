import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';

import { IDateTime, IOrder , IScheduleData, IUser } from '../../../core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  //params
  user_name:string = 'NONE';
  order_id:number = -1;

  //order
  order:IOrder | undefined;
  user: IUser| undefined;


  constructor(
    private router:ActivatedRoute,
    private ApiService : ApiService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe((params:Params) => {
      this.user_name = params.user;
      this.order_id = Number(params.id);
      this.getOrder();
    })
  }
  getOrder():void {
    this.ApiService.getUsers()
    .subscribe(users => {
      const user:IUser | undefined = users.find(u => u.name.toLowerCase() === this.user_name);
      if(user){
        const schedules:IScheduleData = <IScheduleData> user.schedules.find(s => s.id === this.order_id);

        this.order = {
          ...schedules,
          user_name: user.name
        }
        this.user = user;
      }else {
        alert('error');
      }
      
    })
  }

  //computed

  buildDate(dateTime:IDateTime):string {
    const date = dateTime.date;
    const month = dateTime.month;
    const year = dateTime.year; 
    return `${date} / ${month} / ${year}`;
  }
}
