import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Catalog from './catalog';
import { renderComponent } from '../../test-utils/render-util';
import { APPRoute } from '../../const';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const catalog = <Catalog/>;

describe ('Catalog Component', () => {
  it ('LOADED: should render correctly', () => {
    const store = mockStore(stateFilled);

    renderComponent(catalog, store, history);

    history.push(APPRoute.Catalog);

    expect(screen.getByText(ScreenText.Catalog.Filled.Title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Catalog.Filled.Sort)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Catalog.Filled.Filter)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Loading)).not.toBeInTheDocument();

  });

  it ('LOADING: should render Spinner', () => {
    const store = mockStore({...stateFilled, Main: {isLoading: true}});

    renderComponent(catalog, store, history);

    history.push(APPRoute.Catalog);

    expect(screen.getByText(ScreenText.Loading)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Catalog.Filled.Title)).not.toBeInTheDocument();
  });
});
