import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  IDateTime,
  IOrder,
  IScheduleData,
  IUser,
} from '../../../core/models/interfaces';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  //params
  user_name: string = 'NONE';
  order_id: string = '-1';

  //order
  order: IOrder | undefined;
  user: IUser | undefined;

  constructor(
    private router: ActivatedRoute,
    private ApiService: ApiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.user_name = params.user;
      this.order_id = params.id;
      this.getOrder();
    });
  }
  getOrder(): void {
    this.ApiService.getUsers().subscribe((data) => {
      const user: IUser | undefined = data.response.find(
        (u) => u.name.toLowerCase() === this.user_name.toLowerCase()
      );
      if (user) {
        const schedules: IScheduleData = <IScheduleData>(
          user.shedules.find((s) => s._id === this.order_id)
        );

        this.order = {
          ...schedules,
          user_name: user.name,
        };
        this.user = user;
      } else {
        this.route.navigate(['/']);
      }
    });
  }

  //computed

  buildDate(dateTime: IDateTime): string {
    const date = dateTime.date;
    const month = dateTime.month;
    const year = dateTime.year;
    return `${date} / ${month} / ${year}`;
  }
}
