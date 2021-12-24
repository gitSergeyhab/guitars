import { loadAllGuitars, loadGuitars, loadSearchGuitars, noParseParamsFromUrl, setGuitarsErrorStatus, setGuitarsLoadingStatus } from '../actions';
import { mainReducer } from './main-reducer';
import { fakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';


const testData = {...stateFilled.Main};
const initialState = {...stateEmpty.Main, allGuitarsLoading: true, isLoading: true};


describe('Reducer : mainReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(mainReducer(undefined, fakeAction)).toEqual(initialState);
  });

  it('should update guitars, isLoading by loadGuitars', () => {
    const expectedState = {...state, guitars: testData.guitars, isLoading: false};
    expect(mainReducer(state, loadGuitars(testData.guitars))).toEqual(expectedState);
  });

  it('should update allGuitars, allGuitarsLoading by loadAllGuitars', () => {
    const expectedState = {...state, allGuitars: testData.allGuitars, allGuitarsLoading: false};
    expect(mainReducer(state, loadAllGuitars(testData.allGuitars))).toEqual(expectedState);
  });

  it('should update searchGuitars by loadSearchGuitars', () => {
    const expectedState = {...state, searchGuitars: testData.searchGuitars};
    expect(mainReducer(state, loadSearchGuitars(testData.searchGuitars))).toEqual(expectedState);
  });

  it('should update isLoading by setGuitarsLoadingStatus', () => {
    const expectedState = {...state, isLoading: false};
    expect(mainReducer(state, setGuitarsLoadingStatus(false))).toEqual(expectedState);
  });

  it('should update isError by setGuitarsErrorStatus', () => {
    const expectedState = {...state, isError: true};
    expect(mainReducer(state, setGuitarsErrorStatus(true))).toEqual(expectedState);
  });


  it('should update parseParamsFromUrl by noParseParamsFromUrl', () => {
    const expectedState = {...state, parseParamsFromUrl: false};
    expect(mainReducer(state, noParseParamsFromUrl())).toEqual(expectedState);
  });
});
