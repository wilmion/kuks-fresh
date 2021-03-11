import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { logOut } from '../../../store/user/user.actions';

import { IDateTime, IProfileFrame , IUser } from 'src/app/core/models/interfaces';
import { cleanItemStorage } from 'src/app/core/utils/generateLocal';
import { convertDataToString } from 'src/app/core/utils/dateUtils';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  settings:IProfileFrame[] = []; 
  user:IUser | undefined;

  constructor(
    private store:Store<{user:IUser}>,
    private router:Router
  ) {   
    this.store.select('user').subscribe(user => {
      this.user = user;
      this.setValueSettings();
    })
  }
  setValueSettings():void {
    const user:IUser = <IUser> this.user;
    this.settings = [
      {
        title: "Basic Information",
        configs: [
          {
            key: "Name",
            keyObject: "name",
            value: user.name,
            edit: false
          },
          {
            key: "Job",
            keyObject: "job",
            value: user.job,
            edit: false
          },
          {
            key: "ImageUrl",
            keyObject: "image",
            value: user.image,
            edit: false
          }
        ]
      },
      {
        title: "Delivery Information",
        configs: [
          {
            key: "City",
            keyObject: "city",
            value: user.city,
            edit: false
          },
          {
            key: "Country",
            keyObject: "country",
            value: user.country,
            edit: false
          },
          {
            key: "Direction",
            keyObject: "direction",
            value: user.direction,
            edit: false
          },
          {
            key: "DNI",
            keyObject: "dni",
            value: user.dni,
            edit: false
          },
          {
            key: "Phone Number",
            keyObject: "phoneNumber",
            value: user.phoneNumber,
            edit: false
          },
          {
            key: "House Number",
            keyObject: "houseNumber",
            value: user.houseNumber,
            edit: false
          }
        ]
      }
    ]
  }

  ngOnInit(): void {
  }

  logOut():void {
    cleanItemStorage('user');
    this.store.dispatch(logOut());
    this.router.navigate(['/']);
  }

  convertTime(data:IDateTime):string {
    return convertDataToString(data);
  }

}
