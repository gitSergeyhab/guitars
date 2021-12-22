import { createAction } from '@reduxjs/toolkit';
import { CartGuitar, Comment, Guitar, GuitarWithComments } from '../types/types';
import { PopupType } from '../const';


const enum ActionType {
  //catalog
  LoadGuitars = 'data/main/LoadGuitars',
  SetGuitarsLoadingStatus = 'main/SetGuitarsLoadingStatus',
  SetGuitarsErrorStatus = 'main/SetGuitarsErrorStatus',

  LoadAllGuitars = 'data/main/LoadAllGuitars',
  SetAllGuitarsLoadingStatus = 'main/SetGuitarsLoadingStatus',
  SetAllGuitarsErrorStatus = 'main/SetGuitarsErrorStatus',
  // ---
  NoParseParamsFromUrl = 'main/url/NoParseParamsFromUrl',

  // catalog - filter
  SetUserMinPrice = 'main/filter/SetUserMinPrice',
  SetUserMaxPrice = 'main/filter/SetUserMaxPrice',
  SetUserTypes = 'main/filter/SetUserTypes',
  SetCheckedStrings = 'main/filter/SetCheckedStrings',

  // catalog - sort
  SetSort = 'main/sort/SetSort',
  SetOrder = 'main/sort/SetOrder',

  // catalog - search
  LoadSearchGuitars = 'data/main/LoadSearchGuitars',

  //product
  LoadTheGuitar = 'data/main/LoadTheGuitar',
  SetTheGuitarLoadingStatus = 'guitar/SetTheGuitarLoadingStatus',
  SetTheGuitarErrorStatus = 'guitar/SetGuitarsErrorStatus',
  SetComments = 'guitar/SetComments',

  //popup
  SetGuitarToPopup = 'guitar/popup/SetGuitarToPopup',
  SetPopupType = 'guitar/popup/SetPopupType',
  //cart
  SetCartGuitars = 'cart/SetCartGuitars',
  SetDiscount = 'cart/SetDiscount',
  SetCoupon = 'cart/SetCoupon',

  //Pagination
  SetCurrentPage = 'main/page/SetCurrentPage',
  SetStartPagination = 'main/page/SetStartPagination',
  SetLimit = 'main/page/SetLimit',
  SetGuitarCount = 'main/page/SetGuitarsCount',
}

//catalog
export const loadGuitars = createAction(ActionType.LoadGuitars, (guitars: GuitarWithComments[]) => ({payload: guitars}));
export const setGuitarsLoadingStatus = createAction(ActionType.SetGuitarsLoadingStatus, (status: boolean) => ({payload: status}));
export const setGuitarsErrorStatus = createAction(ActionType.SetGuitarsErrorStatus, (status: boolean) => ({payload: status}));

export const loadAllGuitars = createAction(ActionType.LoadAllGuitars, (guitars: Guitar[]) => ({payload: guitars}));
export const setAllGuitarsLoadingStatus = createAction(ActionType.SetAllGuitarsLoadingStatus, (status: boolean) => ({payload: status}));
export const setAllGuitarsErrorStatus = createAction(ActionType.SetAllGuitarsErrorStatus, (status: boolean) => ({payload: status}));
// ---
export const noParseParamsFromUrl = createAction(ActionType.NoParseParamsFromUrl);

// catalog - search
export const loadSearchGuitars = createAction(ActionType.LoadSearchGuitars, (guitars: Guitar[]) => ({payload: guitars}));

// catalog - filter
export const setUserMinPrice = createAction(ActionType.SetUserMinPrice, (price: number | null) => ({payload: price}));
export const setUserMaxPrice = createAction(ActionType.SetUserMaxPrice, (price: number | null) => ({payload: price}));
export const setUserTypes = createAction(ActionType.SetUserTypes, (type: string[]) => ({payload: type}));
export const setCheckedStrings = createAction(ActionType.SetCheckedStrings, (type: number[]) => ({payload: type}));

// catalog - sort
export const setSort = createAction(ActionType.SetSort, (sort: string) => ({payload: sort}));
export const setOrder = createAction(ActionType.SetOrder, (order: string) => ({payload: order}));

//product
export const loadTheGuitar = createAction(ActionType.LoadTheGuitar, (guitars: Guitar) => ({payload: guitars}));
export const setTheGuitarLoadingStatus = createAction(ActionType.SetTheGuitarLoadingStatus, (status: boolean) => ({payload: status}));
export const setTheGuitarErrorStatus = createAction(ActionType.SetTheGuitarErrorStatus, (status: boolean) => ({payload: status}));
export const setComments = createAction(ActionType.SetComments, (comments: Comment[]) => ({payload: comments}));

//cart - popup
export const setGuitarToPopup = createAction(ActionType.SetGuitarToPopup, (guitar: Guitar | null) => ({payload: guitar}));
export const setPopupType = createAction(ActionType.SetPopupType, (status: PopupType | null) => ({payload: status}));
export const setCartGuitars = createAction(ActionType.SetCartGuitars, (cartGuitars: CartGuitar[]) => ({payload: cartGuitars}));
export const setDiscount = createAction(ActionType.SetDiscount, (percent: number) => ({payload: percent}));
export const setCoupon = createAction(ActionType.SetCoupon, (coupon: string) => ({payload: coupon}));

//Pagination
export const setCurrentPage = createAction(ActionType.SetCurrentPage, (currentPage: number) => ({payload: currentPage}));
export const setStartPagination = createAction(ActionType.SetStartPagination, (start: number) => ({payload: start}));
export const setLimit = createAction(ActionType.SetLimit, (limit: number) => ({payload: limit}));
export const setGuitarCount = createAction(ActionType.SetGuitarCount, (count: number) => ({payload: count}));
