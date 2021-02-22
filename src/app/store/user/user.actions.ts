import { createAction , props } from '@ngrx/store';
import { IUser } from 'src/app/core/models/interfaces';

export const signUp = createAction('SIGN_UP', props<{user: IUser}>());
export const logOut = createAction('LOG_OUT');
