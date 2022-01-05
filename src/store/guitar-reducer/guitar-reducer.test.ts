import { loadTheGuitar, setComments, setTheGuitarErrorStatus, setTheGuitarLoadingStatus } from '../actions';
import { guitarReducer } from './guitar-reducer';
import { fakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';
import { Guitar } from '../../types/types';


const testData = {...stateFilled.Guitar};
const initialState = {...stateEmpty.Guitar, isLoading: true, isError: true};


describe('Reducer : guitarReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(guitarReducer(state, fakeAction)).toEqual(initialState);
  });

  it('should update guitar, isLoading, isError by loadTheGuitar', () => {
    const expectedState = {...state, guitar: testData.guitar, isLoading: false, isError: false};
    expect(guitarReducer(state, loadTheGuitar(testData.guitar as Guitar))).toEqual(expectedState);
  });

  it('should update isLoading by setTheGuitarLoadingStatus', () => {
    const expectedState = {...state,  isLoading: false};
    expect(guitarReducer(state, setTheGuitarLoadingStatus(false))).toEqual(expectedState);
  });

  it('should update isLoading, isError  by setTheGuitarErrorStatus', () => {
    const expectedState = {...state, isLoading: false, isError: false};
    expect(guitarReducer(state, setTheGuitarErrorStatus(false))).toEqual(expectedState);
  });

  it('should update comments by setComments', () => {
    const expectedState = {...state, comments: testData.comments};
    expect(guitarReducer(state, setComments(testData.comments))).toEqual(expectedState);
  });
});
