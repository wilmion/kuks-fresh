import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { logOut } from '@root/store/user/user.actions';

import { buildSettingMock } from '@core/mocks/settings-profile.mock';

import { IDateTime, IProfileFrame, IUser } from '@core/models/interfaces';

import { cleanItemStorage } from '@core/utils/generateLocal';
import { convertDataToString } from '@core/utils/dateUtils';
import { setTitle } from '@core/utils/setTitle.util';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  settings: IProfileFrame[] = [];
  user: IUser | undefined;

  constructor(private store: Store<{ user: IUser }>, private router: Router) {
    this.store.select('user').subscribe((user) => {
      this.user = user;
      this.setValueSettings();
    });
  }
  setValueSettings(): void {
    const user: IUser = <IUser>this.user;
    this.settings = buildSettingMock(user);
  }

  ngOnInit(): void {
    setTitle('My profile');
  }

  // Se va de la sesión
  logOut(): void {
    cleanItemStorage('user');
    cleanItemStorage('pass');
    cleanItemStorage('token');
    this.store.dispatch(logOut());
    document.location.href = '/';
  }

  //Convierte un dato a string
  convertTime(data: IDateTime): string {
    return convertDataToString(data);
  }
}
