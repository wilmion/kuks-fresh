import { Store } from '@ngrx/store';
import { signUp } from '@root/store/user/user.actions';

import { IUser } from '@core/models/interfaces';

import { ApiService } from '@core/services/api.service';

import { getItemLocalStorage, writeLocalStorage } from './generateLocal';

export function updateUserData(
  apiService: ApiService,
  email: string,
  store: Store<{
    user: IUser;
  }>,
  orders?: (user: IUser) => any
) {
  let password = getItemLocalStorage('pass') as string;
  password = password.replace(/[ '"]+/g, '');

  apiService.login({ email, password }).subscribe((data) => {
    const token = data.response.token;
    const user = data.response.user;

    store.dispatch(signUp({ user: user }));

    writeLocalStorage('token', token);
    writeLocalStorage('user', user);

    if (orders) orders(user);
  });
}
