import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { logOut } from '../../../store/user/user.actions';

import { IProfileFrame , IUser } from 'src/app/core/models/interfaces';
import { cleanItemStorage } from 'src/app/core/utils/generateLocal';

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
    this.setValueSettings();
    this.store.select('user').subscribe(user => {
      this.user = user;
    })
  }
  setValueSettings():void {
    this.settings = [
      {
        title: "Basic Information",
        configs: [
          {
            key: "Name",
            value: "Wilmion Navarrete",
            edit: false
          },
          {
            key: "Job",
            value: "Frontend Developer",
            edit: false
          },
          {
            key: "Email",
            value: "wilbert121@hotmail.com",
            edit: false
          },
          {
            key: "Password",
            value: "***********",
            edit: false
          },
          {
            key: "ImageUrl",
            value: "URLImage",
            edit: false
          }
        ]
      },
      {
        title: "Delivery Information",
        configs: [
          {
            key: "City",
            value: "Not Defined",
            edit: false
          },
          {
            key: "Country",
            value: "Not Defined",
            edit: false
          },
          {
            key: "Direction",
            value: "Not Defined",
            edit: false
          },
          {
            key: "DNI",
            value: "Not Defined",
            edit: false
          },
          {
            key: "Phone Number",
            value: "Not Defined",
            edit: false
          },
          {
            key: "House Number",
            value: "Not Defined",
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

}
