import { createSelector } from 'reselect';
import { Guitar, GuitarWithComments, State } from '../../types/types';
import { getMinMaxPrice } from '../../utils/utils';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Main;

export const getGuitars = (state: State): GuitarWithComments[] => state[field].guitars;
export const getGuitarsErrorStatus = (state: State): boolean => state[field].isError;
export const getGuitarsLoadingStatus = (state: State): boolean => state[field].isLoading;

export const getAllGuitars = (state: State): Guitar[] => state[field].allGuitars;
export const getAllGuitarsErrorStatus = (state: State): boolean => state[field].allGuitarsError;
export const getAllGuitarsLoadingStatus = (state: State): boolean => state[field].allGuitarsLoading;

export const getSearchGuitars = (state: State): Guitar[] => state[field].searchGuitars;

export const getParseFromUrlStatus = (state: State): boolean => state[field].parseParamsFromUrl;

export const getPricesFromCatalog = createSelector([getAllGuitars], (guitars) => getMinMaxPrice(guitars));


