import { Guitar, GuitarWithComments, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Main;

export const getGuitars = (state: State): GuitarWithComments[] => state[field].guitars;
export const getGuitarsErrorStatus = (state: State): boolean => state[field].isError;
export const getGuitarsLoadingStatus = (state: State): boolean => state[field].isLoading;

export const getSearchGuitars = (state: State): Guitar[] => state[field].searchGuitars;
export const getSearchLoadingStatus = (state: State): boolean => state[field].searchLoading;

export const getParseFromUrlStatus = (state: State): boolean => state[field].parseParamsFromUrl;
