import { createReducer } from '@reduxjs/toolkit';
import { CartGuitar } from '../../types/types';
import {setCartGuitars, setCoupon, setCouponValidStatus, setDiscount } from '../actions';


type InitialState = {
  cartGuitars: CartGuitar[],
  discount: number,
  coupon: string,
  isCouponValid: null | boolean,
}

export const initialState: InitialState = {
  cartGuitars: [],
  discount: 0,
  coupon: '',
  isCouponValid: null,
};


export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCartGuitars, (state, action) => {state.cartGuitars = action.payload;})
    .addCase(setDiscount, (state, action) => {state.discount = action.payload;})
    .addCase(setCoupon, (state, action) => {state.coupon = action.payload;})
    .addCase(setCouponValidStatus, (state, action) => {state.isCouponValid = action.payload;});
});

