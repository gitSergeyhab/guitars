import { loadAllGuitars, loadGuitars, loadSearchGuitars, noParseParamsFromUrl, setGuitarsErrorStatus, setGuitarsLoadingStatus } from '../actions';
import { mainReducer } from './main-reducer';
import { FakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';


const testData = {...stateFilled.Main};
const initialState = {...stateEmpty.Main};


describe('Reducer : mainReducer', () => {
  let state = {...stateEmpty.Main};
  beforeEach (() => state = {...stateEmpty.Main});

  it('without additional parameters should return initial state', () => {
    expect(mainReducer(undefined, FakeAction)).toEqual(initialState);
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


// type InitialState = {
//   guitars: GuitarWithComments[],
//   isLoading: boolean,
//   isError: boolean,

//   allGuitars: Guitar[],
//   allGuitarsLoading: boolean,
//   allGuitarsError: boolean,

//   searchGuitars: Guitar[],

//   parseParamsFromUrl: boolean,
// }


// export const mainReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(loadGuitars, (state, action) => {
//       state.guitars = action.payload;
//       state.isLoading = false;
//     })
//     .addCase(loadAllGuitars, (state, action) => {
//       state.allGuitars = action.payload;
//       state.allGuitarsLoading = false;
//     })
//     .addCase(loadSearchGuitars, (state, action) => {state.searchGuitars = action.payload;})
//     .addCase(setGuitarsLoadingStatus, (state, action) => {state.isLoading = action.payload;})
//     .addCase(setGuitarsErrorStatus, (state, action) => {state.isError = action.payload;})

//     .addCase(noParseParamsFromUrl, (state) => {state.parseParamsFromUrl = false;});
// });
