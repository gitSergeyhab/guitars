import { combineReducers } from '@reduxjs/toolkit';

import { cartReducer } from './cart-reducer/cart-reducer';
import { filterReducer } from './filter-reducer/filter-reducer';
import { guitarReducer } from './guitar-reducer/guitar-reducer';
import { mainReducer } from './main-reducer/main-reducer';
import { paginationReducer } from './pagination-reducer/pagination-reducer';
import { sortReducer } from './sort-reducer/sort-reducer';

export const enum ReducerName {
  Main = 'Main',
  Guitar = 'Guitar',
  Cart = 'Cart',
  Pagination = 'Pagination',
  Filter = 'Filter',
  Sort = 'Sort',
}

export const rootReducer = combineReducers({
  [ReducerName.Main]: mainReducer,
  [ReducerName.Guitar]: guitarReducer,
  [ReducerName.Cart]: cartReducer,
  [ReducerName.Pagination]: paginationReducer,
  [ReducerName.Filter]: filterReducer,
  [ReducerName.Sort]: sortReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
