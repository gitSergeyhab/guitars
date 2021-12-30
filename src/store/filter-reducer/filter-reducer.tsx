import { createReducer } from '@reduxjs/toolkit';
import { GuitarType } from '../../const';
import { getStringsCount } from '../../utils/utils';
import { setCheckedStrings, setMaxPrice, setMinPrice, setUserMaxPrice, setUserMinPrice, setUserTypes } from '../actions';


export type InitialState = {
  minPrice: number | null,
  maxPrice: number | null,
  userMinPrice: number | null,
  userMaxPrice: number | null,
  userType: string[],
  stringsActive: number[],
  stringsChecked: number[],
}


export const initialState: InitialState = {
  minPrice: null,
  maxPrice: null,
  userMinPrice: null,
  userMaxPrice: null,
  userType: [],
  stringsActive: [],
  stringsChecked: [],
};


export const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMinPrice, (state, action) => {state.minPrice = action.payload;})
    .addCase(setMaxPrice, (state, action) => {state.maxPrice = action.payload;})
    .addCase(setUserMinPrice, (state, action) => {state.userMinPrice = action.payload;})
    .addCase(setUserMaxPrice, (state, action) => {state.userMaxPrice = action.payload;})
    .addCase(setUserTypes, (state, action) => {
      state.userType = action.payload;
      state.stringsActive = getStringsCount(action.payload as GuitarType[]);
    })

    .addCase(setCheckedStrings, (state, action) => {state.stringsChecked = action.payload;});
});
