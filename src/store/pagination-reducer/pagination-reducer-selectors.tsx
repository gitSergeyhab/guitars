import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';

const field = ReducerName.Pagination;

export const getCurrentPage = (state: State): number => state[field].currentPage;
export const getStart = (state: State): number => state[field].start;
export const getLimit = (state: State): number => state[field].limit;
export const getGuitarCount = (state: State): number => state[field].guitarCount;
