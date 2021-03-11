import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';

import { getItemLocalStorage } from '../utils/generateLocal';

import { Observable } from 'rxjs';
import { IUser } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  admin:boolean = false;

  constructor(
    private store:Store<{user:IUser}>
  ){
    this.store.select('user').subscribe(user => {
      this.admin = (user.id != '-1' && user.admin);
      const userLocal = getItemLocalStorage('user');
      if(userLocal) {
        const userLocalData:IUser = JSON.parse(userLocal);
        this.admin = userLocalData.admin;
      }
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.admin;
  }
  
}
