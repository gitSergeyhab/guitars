import { GuitarType } from '../../const';
import { fakeAction, stateEmpty } from '../../test-utils/test-constants';
import { getStringsCount } from '../../utils/utils';
import { setCheckedStrings, setMaxPrice, setMinPrice, setUserMaxPrice, setUserMinPrice, setUserTypes } from '../actions';
import { filterReducer } from './filter-reducer';


const testData = {
  minPrice: 5000,
  maxPrice: 40000,
  userMinPrice: 10000,
  userMaxPrice: 30000,
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

  it('should update minPrice by setMinPrice', () => {
    const expectedState = {...state, minPrice: testData.minPrice};
    expect(filterReducer(state, setMinPrice(testData.minPrice))).toEqual(expectedState);
  });

  it('should update maxPrice by setMaxPrice', () => {
    const expectedState = {...state, maxPrice: testData.maxPrice};
    expect(filterReducer(state, setMaxPrice(testData.maxPrice)) ).toEqual(expectedState);
  });

  it('should update userMinPrice by setUserMinPrice', () => {
    const expectedState = {...state, userMinPrice: testData.userMinPrice};
    expect(filterReducer(state, setUserMinPrice(testData.userMinPrice)) ).toEqual(expectedState);
  });

  it('should update userMaxPrice by setUserMaxPrice', () => {
    const expectedState = {...state, userMaxPrice: testData.userMaxPrice};
    expect(filterReducer(state, setUserMaxPrice(testData.userMaxPrice)) ).toEqual(expectedState);
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
