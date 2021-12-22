import { setOrder,  setSort } from '../actions';
import { sortReducer } from './sort-reducer';
import { FakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';


const testData = {...stateFilled.Sort};
const initialState = {...stateEmpty.Sort};

describe('Reducer : sortReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(sortReducer(undefined, FakeAction)).toEqual(initialState);
  });

  it('should update sort, isSort by setSort', () => {
    const expectedState = {...state, sort: testData.sort, isSort: true};
    expect(sortReducer(state, setSort(testData.sort))).toEqual(expectedState);
  });

  it('should update order, isSort by setOrder', () => {
    const expectedState = {...state, order: testData.order, isSort: true};
    expect(sortReducer(state, setOrder(testData.order))).toEqual(expectedState);
  });
});
