import { createReducer , on , Action } from '@ngrx/store';

import { signUp , logOut } from './user.actions';

import { IUser } from '../../core/models/interfaces';

const userState:IUser = {
    id: -1,
    email: 'NONE',
    schedules: [],
};

const _userReducer = createReducer(
    userState,
    on(signUp , (state , {user} ) => user),
    on(logOut , (state) => ({
        id: -1,
        email: 'NONE',
        schedules: []
    }))
)

export const userReducer = (state:IUser | undefined , action:Action) => _userReducer(state , action);