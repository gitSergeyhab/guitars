import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Filter;

export const getUserTypes = (state: State): string[] => state[field].userType;
export const getActiveStrings = (state: State): number[] => state[field].stringsActive;
export const getCheckedStrings = (state: State): number[] => state[field].stringsChecked;
export const getUserMinPrice = (state: State): number | null => state[field].userMinPice;
export const getUserMaxPrice = (state: State): number | null => state[field].userMaxPice;

