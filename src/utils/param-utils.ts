import { Dispatch } from 'react';
import { ParamName } from '../const';
import { setCheckedStrings, setCurrentPage, setLimit, setOrder, setSort, setUserMaxPrice, setUserMinPrice, setUserTypes } from '../store/actions';
import { Params } from '../types/types';

import qs from 'qs';
import { Action } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const ERROR_MESSAGE_PARAMS = 'incorrect parameters have been entered';
const PAGE_NULL = '0';

export const getStringPrice = (type: string, price: number | null): Params => price ? ({[type]: `${price}`}) : {};


type MakeFilterParams = {types: string[] , strings: number[], maxPrice: number | null, minPrice: number | null}

export const makeFilterParams = ({types, strings, maxPrice, minPrice} : MakeFilterParams): Params => ({
  type: types,
  stringCount: strings.map((item) => item.toString()),
  ...getStringPrice(ParamName.Filter.PriceLte, maxPrice),
  ...getStringPrice(ParamName.Filter.PriceGte, minPrice),
});


export const makeReducerFromUrl = (params: Params, dispatch: Dispatch<Action>): void => {
  try {
    const types = params[ParamName.Filter.Type];
    if (types) {
      const value = typeof types === 'string' ? [types] : types;
      dispatch(setUserTypes(value));
    }

    const stringCount = params[ParamName.Filter.StringCount];
    if (stringCount) {
      const value = typeof stringCount === 'string' ? [+stringCount] : stringCount.map((item) => +item);
      dispatch(setCheckedStrings(value));
    }

    const maxPrice = params[ParamName.Filter.PriceLte];
    if (maxPrice) {
      dispatch(setUserMaxPrice(+maxPrice));
    }

    const minPrice = params[ParamName.Filter.PriceGte];
    if (minPrice) {
      dispatch(setUserMinPrice(+minPrice));
    }

    const sort = params[ParamName.Sort.Sort];
    if (sort && (sort === ParamName.Sort.Price || sort === ParamName.Sort.Rating)) { // применять параметры сортировки, только если они адекватные
      dispatch(setSort(sort));
    }

    const order = params[ParamName.Sort.Order];
    if (order && (order === ParamName.Sort.Asc || order === ParamName.Sort.Desc)) { // ...
      dispatch(setOrder(order));
    }

    const limit = params[ParamName.Range.Limit];
    const page = params[ParamName.Range.Page];

    if (limit && page) {
      dispatch(setLimit(+limit));
      dispatch(setCurrentPage( page === PAGE_NULL ?  1 : Math.abs(+page)));
    }
  } catch {
    toast.error(ERROR_MESSAGE_PARAMS);
  }
};


type MakeSortParams = {sort: string, order: string}

export const makeSortParams = ({sort, order} : MakeSortParams): Params => {
  let params = {};
  if (sort === ParamName.Sort.Price || sort === ParamName.Sort.Rating) {
    params = {[ParamName.Sort.Sort]: sort};
  }

  if (order === ParamName.Sort.Asc ||  order === ParamName.Sort.Desc) {
    params = {...params, [ParamName.Sort.Order]: order};
  }

  return params;
};

export const collectParams = (params: Params[]): Params => params.reduce((acc, param) => ({...acc, ...param}) , {});

export const makePageParams = (start: number, limit: number) => ({
  [ParamName.Range.Limit]: limit.toString(),
  [ParamName.Range.Page]: Math.floor(start / limit + 1).toString(),
});


export const getParams = (search: string) : Params => {
  const params = qs.parse(search.split('?')[1]);
  return params as Params;
};


export const addPriceToParam = (search: string, value: string, typePrice: string) : Params => {
  const params = getParams(search);
  return {...params, [typePrice] : value};
};

export const getUrlFromParams = (params: Params): string => `?${qs.stringify(params)}`;


export const makeNewSearch = (search: string, param: string, value: string | string[] | number | number[]) => {
  const searchParam = search.split('?')[1] || '';
  const urlParams = qs.parse(searchParam) as Params;
  const newParams = {...urlParams, [param]: value};
  return `?${qs.stringify(newParams)}`;
};
