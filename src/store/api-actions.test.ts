import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { State } from '../types/types';
import { fetchExtremePrices, fetchGuitarsWithPath, fetchGuitarsWithSearch, SORT_BY_PRICE_URL } from './api-actions';
import { loadGuitars, loadSearchGuitars, setGuitarCount, setGuitarsErrorStatus, setMaxPrice, setMinPrice, setSearchLoadingStatus } from './actions';
import { makeFakeGuitarList } from '../test-utils/test-mocks';
import { ApiRoute, ParamName } from '../const';


const SEARCH_STRING = 'curt';
const fakeGuitars = makeFakeGuitarList();


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
});
