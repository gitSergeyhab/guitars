import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart-reducer/cart-reducer';
import { guitarReducer } from './guitar-reducer/guitar-reducer';
import { catalogReducer } from './catalog-reducer/catalog-reducer';


export const enum ReducerName {
  Catalog = 'Catalog',
  Guitar = 'Guitar',
  Cart = 'Cart',
}

export const rootReducer = combineReducers({
  [ReducerName.Catalog]: catalogReducer,
  [ReducerName.Guitar]: guitarReducer,
  [ReducerName.Cart]: cartReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
