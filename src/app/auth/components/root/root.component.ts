import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { writeLocalStorage } from '../../../core/utils/generateLocal';

import { Store } from '@ngrx/store';
import {
  IResponse,
  IResponseLogin,
  IUser,
} from 'src/app/core/models/interfaces';
import { signUp } from '../../../store/user/user.actions';
import { setTitle } from '@core/utils/setTitle.util';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  param: 'login' | 'register' = 'login';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private StoreUser: Store<{ user: IUser }>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.param = params.mode;
      setTitle(this.param.toUpperCase());
    });
  }
  navigateToURl(url: string): void {
    this.router.navigate([url]);
  }
  logIn(res: IResponse<IResponseLogin>) {
    this.StoreUser.dispatch(signUp({ user: res.response.user }));

    writeLocalStorage('user', res.response.user);
    writeLocalStorage('token', res.response.token);

    this.router.navigate(['/']);
  }
}
