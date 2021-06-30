import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
  user_id: string = 'NONE';
  order_id: string = '-1';

  //order
  order: IOrder | undefined;
  user: IUser | undefined;

  constructor(
    private router: ActivatedRoute,
    private ApiService: ApiService,
    private route: Router,
    private store: Store<{ user: IUser }>
  ) {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.user_id = params.user;
      this.order_id = params.id;
      this.getOrder();
    });
  }
  getOrder(): void {
    if (this.user && this.user._id === this.user_id) {
      const schedules: IScheduleData = <IScheduleData>(
        this.user.shedules.find((s) => s._id === this.order_id)
      );
      this.order = {
        ...schedules,
        user_name: this.user.name,
      };
    } else {
      this.getOrderIsAdmin();
    }
  }
  getOrderIsAdmin(): void {
    this.ApiService.getUsers().subscribe((data) => {
      const user: IUser | undefined = data.response.find(
        (u) => u._id === this.user_id
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
