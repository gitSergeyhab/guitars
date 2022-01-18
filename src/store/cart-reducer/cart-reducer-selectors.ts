import { CartGuitar, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Cart;

export const getCartGuitars = (state: State): CartGuitar[] => state[field].cartGuitars;
export const getDiscount = (state: State): number => state[field].discount;
export const getCoupon = (state: State): string | null => state[field].coupon;
export const getCouponValidStatus = (state: State): boolean | null => state[field].isCouponValid;


