import { createReducer } from '@reduxjs/toolkit';
import { Guitar, GuitarWithComments } from '../../types/types';
import { loadGuitars, loadSearchGuitars, noParseParamsFromUrl, setGuitarsErrorStatus, setGuitarsLoadingStatus, setSearchLoadingStatus } from '../actions';


type InitialState = {
  guitars: GuitarWithComments[],
  isLoading: boolean,
  isError: boolean,

  searchGuitars: Guitar[],
  searchLoading: boolean,

  parseParamsFromUrl: boolean,
}


export const initialState: InitialState = {
  guitars: [],
  isLoading: true,
  isError: false,

  searchGuitars: [],
  searchLoading: false,

  parseParamsFromUrl: true,
};


export const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isLoading = false;
    })
    .addCase(loadSearchGuitars, (state, action) => {state.searchGuitars = action.payload;})
    .addCase(setSearchLoadingStatus, (state, action) => {state.searchLoading = action.payload;})
    .addCase(setGuitarsLoadingStatus, (state, action) => {state.isLoading = action.payload;})
    .addCase(setGuitarsErrorStatus, (state, action) => {state.isError = action.payload;})

    .addCase(noParseParamsFromUrl, (state) => {state.parseParamsFromUrl = false;});
});
