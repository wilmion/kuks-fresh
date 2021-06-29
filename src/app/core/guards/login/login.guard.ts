import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { signUp } from '../../../store/user/user.actions';

import {
  writeLocalStorage,
  getItemLocalStorage,
} from '../../../core/utils/generateLocal';
import { IUser } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  logIn: boolean = false;

  constructor(private store: Store<{ user: IUser }>) {
    this.store.select('user').subscribe((user) => {
      this.logIn = user._id !== '-1';
    });
    this.verificateAuth();
  }

  verificateAuth(): void {
    const userAuth: null | string = getItemLocalStorage('user');
    if (userAuth) {
      const user: IUser = <IUser>JSON.parse(userAuth);

      this.store.dispatch(signUp({ user }));

      this.logIn = user._id !== '-1';
    } else {
      this.logIn = false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (state.url === '/auth/login' || state.url === '/auth/register') {
      return !this.logIn;
    }
    return this.logIn;
  }
}
