import { createReducer } from '@reduxjs/toolkit';
import { GUITARS_PER_PAGE } from '../../const';
import { resetPagination, setCurrentPage, setGuitarCount, setLimit } from '../actions';


type InitialState = {
  currentPage: number;
  start: number,
  limit: number,
  guitarCount: number,
}

const initialState: InitialState = {
  currentPage: 1,
  start: 0,
  limit: GUITARS_PER_PAGE,
  guitarCount: 0,
};


export const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLimit, (state, action) => {state.limit = action.payload;})
    .addCase(setGuitarCount, (state, action) => {state.guitarCount = action.payload;})
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
      state.start = (action.payload - 1) * state.limit;
    })
    .addCase(resetPagination, (state) => {
      state.currentPage = 1;
      state.start = 0;
      state.limit = GUITARS_PER_PAGE;
      state.guitarCount = 0;
    });
});
