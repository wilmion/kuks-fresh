import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { IUser } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  logIn:boolean = false;

  constructor(
    private store:Store<{user:IUser}>
  ) {
    this.store.select('user').subscribe(
      user => {
        this.logIn = user.id !== '-1';
      }
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.logIn;
  }
  
}
