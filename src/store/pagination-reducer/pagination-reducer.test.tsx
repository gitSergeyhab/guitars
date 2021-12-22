
import { FakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';
import { setCurrentPage, setGuitarCount, setLimit } from '../actions';
import { paginationReducer } from './pagination-reducer';


const testData = {...stateFilled.Pagination};
const initialState = {...stateEmpty.Pagination};

describe('Reducer : paginationReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(paginationReducer(undefined, FakeAction)).toEqual(initialState);
  });

  it('should update limit by setLimit', () => {
    const expectedState = {...state, limit: testData.limit};
    expect(paginationReducer(state, setLimit(testData.limit)) ).toEqual(expectedState);
  });

  it('should update setGuitarCount by setLimit', () => {
    const expectedState = {...state, guitarCount: testData.guitarCount};
    expect(paginationReducer(state, setGuitarCount(testData.guitarCount)) ).toEqual(expectedState);
  });

  it('should update setCurrentPage by setLimit', () => {
    const expectedState = {...state, currentPage: testData.currentPage, start: (testData.currentPage - 1) * state.limit};
    expect(paginationReducer(state, setCurrentPage(testData.currentPage)) ).toEqual(expectedState);
  });
});
