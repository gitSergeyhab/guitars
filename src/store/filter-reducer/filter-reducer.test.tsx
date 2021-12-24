import { GuitarType } from '../../const';
import { fakeAction, stateEmpty } from '../../test-utils/test-constants';
import { getStringsCount } from '../../utils/utils';
import { setCheckedStrings, setUserMaxPrice, setUserMinPrice, setUserTypes } from '../actions';
import { filterReducer } from './filter-reducer';


const testData = {
  userMinPice: 10000,
  userMaxPice: 30000,
  userType: [GuitarType.Acoustic],
  stringsActive: [6,7,12],
  stringsChecked: [7],
};

const initialState = {...stateEmpty.Filter};

describe('Reducer : filterReducer', () => {
  let state = {...stateEmpty.Filter};
  beforeEach (() => state = {...stateEmpty.Filter});

  it('without additional parameters should return initial state', () => {
    expect(filterReducer(undefined, fakeAction)).toEqual(initialState);
  });

  it('should update userMinPice by setUserMinPrice', () => {
    const expectedState = {...state, userMinPice: testData.userMinPice};
    expect(filterReducer(state, setUserMinPrice(testData.userMinPice)) ).toEqual(expectedState);
  });

  it('should update userMaxPice by setUserMaxPrice', () => {
    const expectedState = {...state, userMaxPice: testData.userMaxPice};
    expect(filterReducer(state, setUserMaxPrice(testData.userMaxPice)) ).toEqual(expectedState);
  });

  it('should update userType, stringsActive by setUserTypes', () => {
    const expectedState = {...state, userType: testData.userType, stringsActive: getStringsCount(testData.userType)};
    expect(filterReducer(state, setUserTypes(testData.userType))).toEqual(expectedState);
  });

  it('should update stringsChecked by setCheckedStrings', () => {
    const expectedState = {...state, stringsChecked: testData.stringsChecked};
    expect(filterReducer(state, setCheckedStrings(testData.stringsChecked))).toEqual(expectedState);
  });
});
