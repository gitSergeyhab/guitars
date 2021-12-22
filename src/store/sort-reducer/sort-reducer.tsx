import { createReducer } from '@reduxjs/toolkit';
import { ParamName } from '../../const';
import {  setOrder,  setSort } from '../actions';


type InitialState = {
  sort: string,
  order: string,
  isSort: boolean
}


export const initialState: InitialState = {
  sort: ParamName.Sort.Origin,
  order: ParamName.Sort.Origin,
  isSort: false,
};


export const sortReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSort, (state, action) => {
      state.sort = action.payload;
      state.isSort = true;
    })
    .addCase(setOrder, (state, action) => {
      state.order = action.payload;
      state.isSort = true;
    });
});
