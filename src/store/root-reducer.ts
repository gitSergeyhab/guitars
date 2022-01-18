import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart-reducer/cart-reducer';
import { guitarReducer } from './guitar-reducer/guitar-reducer';
import { catalogReducer } from './catalog-reducer/catalog-reducer';
import { popupReducer } from './popup-reducer/popup-reducer';


export const enum ReducerName {
  Catalog = 'Catalog',
  Guitar = 'Guitar',
  Cart = 'Cart',
  Popup = 'Popup',
}

export const rootReducer = combineReducers({
  [ReducerName.Catalog]: catalogReducer,
  [ReducerName.Guitar]: guitarReducer,
  [ReducerName.Cart]: cartReducer,
  [ReducerName.Popup]: popupReducer,

});

export type ReducerType = ReturnType<typeof rootReducer>;
