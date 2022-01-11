import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { State } from '../types/types';
import { fetchComments, fetchExtremePrices, fetchGuitarsWithPath, fetchGuitarsWithSearch, fetchTheGuitar, postComment, SORT_BY_PRICE_URL } from './api-actions';
import { loadGuitars, loadSearchGuitars, loadTheGuitar, setComments, setGuitarCount, setGuitarsErrorStatus, setGuitarToPopup, setMaxPrice, setMinPrice, setPopupType, setSearchLoadingStatus, setTheGuitarLoadingStatus } from './actions';
import { makeFakeCommentList, makeFakeGuitar, makeFakeGuitarList } from '../test-utils/test-mocks';
import { ApiRoute, ParamName, PopupType } from '../const';
import { stateFilled } from '../test-utils/test-constants';


const SEARCH_STRING = 'curt';
const TEST_ID = 1;
const TEST_COMMENT_ID = 'TEST_COMMENT_ID';
const TEST_RATING = 3;
const TEST_FIELD = 'TEST_FIELD';

const fakeGuitars = makeFakeGuitarList();
const fakeGuitar = makeFakeGuitar();
const fakeComments = makeFakeCommentList(TEST_ID);

const fakeCommentBody ={
  guitarId: TEST_ID,
  userName: TEST_FIELD,
  advantage: TEST_FIELD,
  disadvantage: TEST_FIELD,
  comment: TEST_FIELD,
  rating: TEST_RATING,
};


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middleWares = [thunk.withExtraArgument(api)];

  type MockThunkDispatch = ThunkDispatch<State, typeof api, Action>;
  const mockStore = configureMockStore<State, Action, MockThunkDispatch>(middleWares);

  // CATALOG

  it('fetchExtremePrices: should dispatch setAllGuitarsErrorStatus and loadAllGuitars when GET /guitars', async () => {
    const store = mockStore();
    const firstGuitar = fakeGuitars[0];
    const lastGuitar = fakeGuitars[fakeGuitars.length - 1];
    mockAPI.onGet(`${ApiRoute.Guitars}${SORT_BY_PRICE_URL}`).reply(200, fakeGuitars);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchExtremePrices());
    expect(store.getActions()).toEqual([
      setMinPrice(firstGuitar.price),
      setMaxPrice(lastGuitar.price),
    ]);
  });

  it('fetchGuitarsWithPath: should dispatch setGuitarsErrorStatus, setGuitarCount and loadGuitars when GET /guitars with path', async () => {
    const store = mockStore();
    const path = '';
    mockAPI.onGet(`${ApiRoute.Guitars}${path}`)
      .reply(200, fakeGuitars, {params: {[ParamName.Embed.Embed]: ParamName.Embed.Comment}});
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchGuitarsWithPath(''));
    expect(store.getActions()).toEqual([
      setGuitarsErrorStatus(false),
      setGuitarCount(fakeGuitars.length),
      loadGuitars(fakeGuitars),
    ]);
  });

  it('fetchGuitarsWithSearch: should dispatch setSearchLoadingStatus, loadSearchGuitars, setSearchLoadingStatus when GET /guitars with search', async () => {
    const store = mockStore();
    const params = {[ParamName.Search.NameLike] : `^${SEARCH_STRING}`};
    mockAPI.onGet(ApiRoute.Guitars).reply(200, fakeGuitars, {params});
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchGuitarsWithSearch(''));
    expect(store.getActions()).toEqual([
      setSearchLoadingStatus(true),
      loadSearchGuitars(fakeGuitars),
      setSearchLoadingStatus(false),
    ]);
  });

  // GUITAR PAGE
  it('fetchTheGuitar: should dispatch setTheGuitarLoadingStatus, loadTheGuitar when GET /guitars/id', async () => {
    const store = mockStore();
    mockAPI.onGet(`${ApiRoute.Guitars}/${fakeGuitar.id}`).reply(200, fakeGuitar);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchTheGuitar(fakeGuitar.id.toString()));
    expect(store.getActions()).toEqual([
      setTheGuitarLoadingStatus(true),
      loadTheGuitar(fakeGuitar),
    ]);
  });

  it('fetchComments: should dispatch setComments with 1.[], 2.data  when GET /guitars/id/comments', async () => {
    const store = mockStore();
    mockAPI.onGet(`${ApiRoute.Guitars}/${TEST_ID}/${ApiRoute.Comments}`).reply(200, fakeComments);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchComments(TEST_ID.toString()));
    expect(store.getActions()).toEqual([
      setComments([]),
      setComments(fakeComments),
    ]);
  });

  it('postComment: should dispatch setPopupType, setGuitarToPopup, setComments when POST /comments', async() => {
    const store = mockStore(stateFilled);
    const comments = stateFilled.Guitar.comments;
    const data = {...fakeComments[0], id: TEST_COMMENT_ID};
    const newComments = [...comments, data];
    mockAPI.onPost(ApiRoute.Comments).reply(201, data);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(postComment({body: fakeCommentBody}));
    expect(store.getActions()).toEqual([
      setPopupType(PopupType.SuccessReview),
      setGuitarToPopup(null),
      setComments(newComments),
    ]);
  });
});
