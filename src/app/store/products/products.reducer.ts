import { createReducer , on , Action } from '@ngrx/store';

import { SET_PRODUCTS } from './products.actions';

import { IProduct } from "../../core/models/interfaces";

const productsState:IProduct[] =[]; 
const _productsReducer = createReducer(
    productsState,
    on(SET_PRODUCTS , (state , {products}) => products)
)

export const productsReducer = (state:IProduct[] | undefined , action:Action ) => {
    return _productsReducer(state , action );
}