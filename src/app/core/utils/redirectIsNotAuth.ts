import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from '../models/interfaces';

export const redirectIsNotAuth = (
  store: Store<{ user: IUser }>,
  router: Router,
  actionsEjecutable: () => void
) => {
  store.select('user').subscribe((user) => {
    const login = user._id !== '-1';
    if (login) {
      actionsEjecutable();
    } else {
      router.navigate(['/auth/login']);
    }
  });
};
