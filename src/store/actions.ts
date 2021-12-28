import { createAction } from '@reduxjs/toolkit';
import { CartGuitar, Comment, Guitar, GuitarWithComments } from '../types/types';
import { PopupType } from '../const';


const enum ActionType {
  //catalog
  LoadGuitars = 'main/LoadGuitars',
  SetGuitarsLoadingStatus = 'main/SetGuitarsLoadingStatus',
  SetGuitarsErrorStatus = 'main/SetGuitarsErrorStatus',

  LoadAllGuitars = 'main/LoadAllGuitars',
  SetAllGuitarsLoadingStatus = 'main/SetAllGuitarsLoadingStatus',
  SetAllGuitarsErrorStatus = 'main/SetGuitarsErrorStatus',
  // catalog - url
  NoParseParamsFromUrl = 'main/NoParseParamsFromUrl',
  // catalog - search
  LoadSearchGuitars = 'main/LoadSearchGuitars',
  SetSearchLoadingStatus = 'main/SetSearchLoadingStatus',

  // catalog - filter
  SetUserMinPrice = 'filter/SetUserMinPrice',
  SetUserMaxPrice = 'filter/SetUserMaxPrice',
  SetUserTypes = 'filter/SetUserTypes',
  SetCheckedStrings = 'filter/SetCheckedStrings',

  // catalog - sort
  SetSort = 'sort/SetSort',
  SetOrder = 'sort/SetOrder',

  //product
  LoadTheGuitar = 'guitar/LoadTheGuitar',
  SetTheGuitarLoadingStatus = 'guitar/SetTheGuitarLoadingStatus',
  SetTheGuitarErrorStatus = 'guitar/SetGuitarsErrorStatus',
  SetComments = 'guitar/SetComments',

  //popup
  SetGuitarToPopup = 'popup/SetGuitarToPopup',
  SetPopupType = 'popup/SetPopupType',
  //cart
  SetCartGuitars = 'cart/SetCartGuitars',
  SetDiscount = 'cart/SetDiscount',
  SetCoupon = 'cart/SetCoupon',

  //pagination
  SetCurrentPage = 'pagination/SetCurrentPage',
  SetStartPagination = 'pagination/SetStartPagination',
  SetLimit = 'pagination/SetLimit',
  SetGuitarCount = 'pagination/SetGuitarsCount',
  ResetPagination = 'pagination/ResetPagination',
}

//catalog
export const loadGuitars = createAction(ActionType.LoadGuitars, (guitars: GuitarWithComments[]) => ({payload: guitars}));
export const setGuitarsLoadingStatus = createAction(ActionType.SetGuitarsLoadingStatus, (status: boolean) => ({payload: status}));
export const setGuitarsErrorStatus = createAction(ActionType.SetGuitarsErrorStatus, (status: boolean) => ({payload: status}));

export const loadAllGuitars = createAction(ActionType.LoadAllGuitars, (guitars: Guitar[]) => ({payload: guitars}));
export const setAllGuitarsLoadingStatus = createAction(ActionType.SetAllGuitarsLoadingStatus, (status: boolean) => ({payload: status}));
export const setAllGuitarsErrorStatus = createAction(ActionType.SetAllGuitarsErrorStatus, (status: boolean) => ({payload: status}));
// catalog - url
export const noParseParamsFromUrl = createAction(ActionType.NoParseParamsFromUrl);
// catalog - search
export const loadSearchGuitars = createAction(ActionType.LoadSearchGuitars, (guitars: Guitar[]) => ({payload: guitars}));
export const setSearchLoadingStatus = createAction(ActionType.SetSearchLoadingStatus, (status: boolean) => ({payload: status}));

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

//popup
export const setGuitarToPopup = createAction(ActionType.SetGuitarToPopup, (guitar: Guitar | null) => ({payload: guitar}));
export const setPopupType = createAction(ActionType.SetPopupType, (status: PopupType | null) => ({payload: status}));
//cart
export const setCartGuitars = createAction(ActionType.SetCartGuitars, (cartGuitars: CartGuitar[]) => ({payload: cartGuitars}));
export const setDiscount = createAction(ActionType.SetDiscount, (percent: number) => ({payload: percent}));
export const setCoupon = createAction(ActionType.SetCoupon, (coupon: string) => ({payload: coupon}));

//Pagination
export const setCurrentPage = createAction(ActionType.SetCurrentPage, (currentPage: number) => ({payload: currentPage}));
export const setStartPagination = createAction(ActionType.SetStartPagination, (start: number) => ({payload: start}));
export const setLimit = createAction(ActionType.SetLimit, (limit: number) => ({payload: limit}));
export const setGuitarCount = createAction(ActionType.SetGuitarCount, (count: number) => ({payload: count}));
export const resetPagination = createAction(ActionType.ResetPagination);

