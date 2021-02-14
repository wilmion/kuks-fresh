import { createReducer , on } from '@ngrx/store';
import { increment } from './store.actions';
export const countState = 0;

const _countReducer = createReducer(
    countState,
    on(increment , (state) => state + 1)
)

export const countReducer = (state:any , action:any) => {
    return _countReducer(state , action);
}