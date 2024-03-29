import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  admin: boolean = false;

  constructor(private store: Store<{ user: IUser }>) {
    this.store.select('user').subscribe((user) => {
      this.admin = user._id != '-1' && user.admin;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.admin;
  }
}
