import { popupReducer } from './popup-reducer';
import { setGuitarToPopup, setPopupType } from '../actions';
import { fakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';


const testData = {...stateFilled.Popup};
const initialState = {...stateEmpty.Popup};


describe('Reducer : cartReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(popupReducer(undefined, fakeAction)).toEqual(initialState);
  });

  it('should update guitarPopup by setGuitarToPopup', () => {
    const expectedState = {...state, guitarPopup: testData.guitarPopup};
    expect(popupReducer(state, setGuitarToPopup(testData.guitarPopup))).toEqual(expectedState);
  });

  it('should update popupType by setPopupType', () => {
    const expectedState = {...state, popupType: testData.popupType};
    expect(popupReducer(state, setPopupType(testData.popupType))).toEqual(expectedState);
  });

});
