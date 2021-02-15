import { createAction, props } from '@ngrx/store'
import { IProduct } from 'src/app/core/models/interfaces';

export const SET_PRODUCTS = createAction('SET_PRODUCTS' , props<{products:IProduct[]}>());