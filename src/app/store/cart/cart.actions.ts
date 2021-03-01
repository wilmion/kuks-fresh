import { createAction , props } from '@ngrx/store'

import { IProduct, IProductsUser } from 'src/app/core/models/interfaces'

export const addToCart = createAction('ADD_TO_CART' , props<{product :IProduct}>() );
export const removeToCart = createAction('REMOVE_TO_CART' , props<{product :IProductsUser}>() );
export const clearCart = createAction('CLEAR_CART');
export const setCart = createAction('SET_TO_CART' , props<{cart:IProductsUser[]}>());
export const removeProduct = createAction('RM_PRODUCT' , props<{product : IProductsUser}>() )