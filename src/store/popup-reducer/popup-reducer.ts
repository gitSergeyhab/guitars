import { createReducer } from '@reduxjs/toolkit';
import { PopupType } from '../../const';
import { Guitar } from '../../types/types';
import { setGuitarToPopup, setPopupType } from '../actions';


type InitialState = {

  guitarPopup: Guitar | null
  popupType: PopupType | null,
}

export const initialState: InitialState = {
  guitarPopup: null,
  popupType: null,
};


export const popupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPopupType, (state, action) => {state.popupType = action.payload;})
    .addCase(setGuitarToPopup, (state, action) => {state.guitarPopup = action.payload;});
});

