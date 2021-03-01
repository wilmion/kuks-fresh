import {createReducer , on , Action} from '@ngrx/store';
import { IProductsUser } from 'src/app/core/models/interfaces';
import { addToCart , setCart , removeToCart ,clearCart , removeProduct} from './cart.actions';

const cartState:IProductsUser[] = [];

const _cartReducer = createReducer(
    cartState,
    on(addToCart , (state , {product}) => {
        const existProduct = state.find(p => p.id === product.id);
        
        if(existProduct){
            const i:number = state.indexOf(existProduct);
            const newAmount:number = state[i].amount + 1;

            const newState = [...state];
            

            const newProduct:IProductsUser = {
                ...product ,
                amount: newAmount
            }

            newState[i] = newProduct;

            return [...newState ];
        }else {
            const newProduct:IProductsUser = {
                ...product,
                amount: 1
            }
            return [...state , newProduct]
        }
    }),
    on(removeToCart , (state , {product}) => {
        if(product.amount > 1){
            const i:number = state.indexOf(product);
            const newAmount:number = state[i].amount - 1;

            const newState = [...state];

            const newProduct:IProductsUser = {
                ...product ,
                amount: newAmount
            }

            newState[i] = newProduct;

            return [...newState];
        }else {
            const newState = state.filter(o => o.id !== product.id);
            return newState;
        }

        
    }), 
    on(removeProduct , (state , {product}) => {
        const i:number = state.indexOf(product);

        const newState = [...state];
        newState.splice(i , 1);


        return [...newState];
    }),
    on(clearCart , (state) => []),
    on(setCart , (state , {cart} ) => cart)
)

export const cartReducer = (state:IProductsUser[] | undefined , actions : Action) => _cartReducer(state , actions);