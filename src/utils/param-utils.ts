import { Dispatch } from 'react';
import { GUITARS_PER_PAGE, ParamName } from '../const';
import { setCheckedStrings, setCurrentPage, setLimit, setOrder, setSort, setUserMaxPrice, setUserMinPrice, setUserTypes } from '../store/actions';
import { Params } from '../types/types';

import qs from 'qs';
import { Action } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getPageCount, getStartGuitar } from './pagination-utils';


const ERROR_MESSAGE_PARAMS = 'incorrect parameters have been entered';
const PAGE_NULL = '0';

const defaultParams = {
  [ParamName.Range.Limit] : GUITARS_PER_PAGE,
};

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

export const makeNewSearch = (search: string, param = '', value: null | string | string[] | number | number[] = '') => {

  const urlOriginParams = getParams(search);
  const urlParams: Params = Object.keys(urlOriginParams).filter((item) => urlOriginParams[item] !== null && urlOriginParams[item] !== '').reduce((acc, item) => ({...acc, [item]: urlOriginParams[item]}) , {});

  const newParamValue = value !== '' ? {[param]: value} : {};

  const page = urlParams[ParamName.Range.Page];
  if (page && param !== ParamName.Range.Page) { // чтобы номер страницы был в конце url
    delete urlParams[ParamName.Range.Page];
    const newParams = {...defaultParams, ...urlParams, ...newParamValue, [ParamName.Range.Page]: page};
    return `?${qs.stringify(newParams)}`;
  }
  const newParams = {...defaultParams, ...urlParams, ...newParamValue};
  return `?${qs.stringify(newParams)}`;
};


export const checkTypeChecked = (search: string, type: string | string[]) => {
  const urlParams = getParams(search);
  const types = urlParams[ParamName.Filter.Type];

  if (!types) {
    return false;
  }
  if (typeof types === 'string') {

    return types === type;
  }

  return !!types.find((item) => item === type);
};


export const getTypesFromUrl = (search: string) => {
  const urlParams = getParams(search);
  const param = urlParams[ParamName.Filter.Type];

  if (!param) {
    return [];
  }
  if (typeof param === 'string') {
    return [param];
  }
  return param;
};

export const getPriceFromUrl = (search: string, paramName: string) => {
  const urlParams = getParams(search);
  const param = urlParams[paramName];
  return param === null ? null : +param;
};


export const getStringCountFromUrl = (search: string) => {
  const urlParams = getParams(search);
  const param = urlParams[ParamName.Filter.StringCount];
  if (!param) {
    return [];
  }
  if (typeof param === 'string') {
    return [+param];
  }
  return param.map((item) => +item);
};


export const checkSort = (search: string) => {
  const urlParams = getParams(search);
  return !!urlParams[ParamName.Sort.Sort];
};

export const getSortAndOrder = (search: string) => {
  const urlParams = getParams(search);
  return {
    sort: urlParams[ParamName.Sort.Sort] as string,
    order: urlParams[ParamName.Sort.Order] as string,
  };
};

export const getPageParamsFromUrl = (search: string, guitarCount: number) => {
  const urlParams = getParams(search);
  const limitFromUrl = urlParams[ParamName.Range.Limit];
  const limit = limitFromUrl ? +limitFromUrl : GUITARS_PER_PAGE;
  const currentPage = +urlParams[ParamName.Range.Page] || 1;
  return {
    currentPage,
    limit,
    pageCount: getPageCount(guitarCount, limit),
    start: getStartGuitar(currentPage, limit),
  };
};
