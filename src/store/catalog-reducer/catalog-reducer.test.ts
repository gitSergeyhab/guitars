import { loadGuitars, loadSearchGuitars, setGuitarCount, setGuitarsErrorStatus, setGuitarsLoadingStatus, setMaxPrice, setMinPrice } from '../actions';
import { catalogReducer } from './catalog-reducer';
import { fakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';


const testData = {...stateFilled.Catalog};
const initialState = {...stateEmpty.Catalog, isLoading: true};


describe('Reducer : catalogReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(catalogReducer(undefined, fakeAction)).toEqual(initialState);
  });

  it('should update guitars, isLoading by loadGuitars', () => {
    const expectedState = {...state, guitars: testData.guitars, isLoading: false};
    expect(catalogReducer(state, loadGuitars(testData.guitars))).toEqual(expectedState);
  });

  it('should update searchGuitars by loadSearchGuitars', () => {
    const expectedState = {...state, searchGuitars: testData.searchGuitars};
    expect(catalogReducer(state, loadSearchGuitars(testData.searchGuitars))).toEqual(expectedState);
  });

  it('should update isLoading by setGuitarsLoadingStatus', () => {
    const expectedState = {...state, isLoading: false};
    expect(catalogReducer(state, setGuitarsLoadingStatus(false))).toEqual(expectedState);
  });

  it('should update isError by setGuitarsErrorStatus', () => {
    const expectedState = {...state, isError: true};
    expect(catalogReducer(state, setGuitarsErrorStatus(true))).toEqual(expectedState);
  });

  it('should update minPrice by setMinPrice', () => {
    const expectedState = {...state, minPrice: testData.minPrice};
    expect(catalogReducer(state, setMinPrice(testData.minPrice))).toEqual(expectedState);
  });

  it('should update maxPrice by setMaxPrice', () => {
    const expectedState = {...state, maxPrice: testData.maxPrice};
    expect(catalogReducer(state, setMaxPrice(testData.maxPrice))).toEqual(expectedState);
  });

  it('should update guitarCount by setGuitarCount', () => {
    const expectedState = {...state, guitarCount: testData.guitarCount};
    expect(catalogReducer(state, setGuitarCount(testData.guitarCount))).toEqual(expectedState);
  });
});
