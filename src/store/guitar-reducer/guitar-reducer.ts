import { createReducer } from '@reduxjs/toolkit';
import { Comment, Guitar } from '../../types/types';
import { loadTheGuitar, setComments, setTheGuitarErrorStatus, setTheGuitarLoadingStatus } from '../actions';

//!! В Н Е   Т З !!


type InitialState = {
  guitar: Guitar | null,
  isLoading: boolean,
  isError: boolean,
  comments: Comment[],
}

export const initialState: InitialState = {
  guitar: null,
  isLoading: false,
  isError: false,
  comments: [],
};


export const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadTheGuitar, (state, action) => {
      state.guitar = action.payload;
      state.isLoading = false;
    })
    .addCase(setTheGuitarLoadingStatus, (state, action) => {state.isLoading =action.payload;})
    .addCase(setTheGuitarErrorStatus, (state, action) => {state.isError =action.payload;})
    .addCase(setComments, (state, action) => {state.comments =action.payload;});
});
