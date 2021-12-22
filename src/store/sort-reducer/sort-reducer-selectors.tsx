import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Sort;


export const getSort = (state: State): string => state[field].sort;
export const getOrder = (state: State): string => state[field].order;
export const getSortStatus = (state: State): boolean => state[field].isSort;
