import { createReducer } from '@reduxjs/toolkit';
import { GuitarType } from '../../const';
import { getStringsCount } from '../../utils/utils';
import { setCheckedStrings, setUserMaxPrice, setUserMinPrice, setUserTypes } from '../actions';


type InitialState = {
  userMinPice: number | null,
  userMaxPice: number | null,
  userType: string[],
  stringsActive: number[],
  stringsChecked: number[],
}


export const initialState: InitialState = {
  userMinPice: null,
  userMaxPice: null,
  userType: [],
  stringsActive: [],
  stringsChecked: [],
};


export const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserMinPrice, (state, action) => {state.userMinPice = action.payload;})
    .addCase(setUserMaxPrice, (state, action) => {state.userMaxPice = action.payload;})
    .addCase(setUserTypes, (state, action) => {
      state.userType = action.payload;
      state.stringsActive = getStringsCount(action.payload as GuitarType[]);
    })

    .addCase(setCheckedStrings, (state, action) => {state.stringsChecked = action.payload;});
});
