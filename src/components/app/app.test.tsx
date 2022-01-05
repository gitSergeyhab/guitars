import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import App from './app';
import { renderComponent } from '../../test-utils/render-util';
import { APPRoute } from '../../const';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';


const TEST_ID = 1;
const FAKE_ROUTE = '/fake';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const store = mockStore(stateFilled);

const app = <App/>;
const renderFakeApp = () => renderComponent(app, store, history);


describe ('App Component', () => {
  it ('test rout /catalog', () => {

    history.push(APPRoute.Catalog);

    renderFakeApp();

    expect(screen.getByText(ScreenText.Catalog.Filled.Title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Catalog.Filled.Sort)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Catalog.Filled.Filter)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Cart.Cart)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Product.Product)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.NotFound.Error404)).not.toBeInTheDocument();
  });

  it ('test rout guitars/id', () => {

    history.push(`guitars/${TEST_ID}`);

    renderFakeApp();

    expect(screen.getByText(ScreenText.Product.Description)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Product.Characteristic)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Catalog.Filled.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Catalog.Filled.Sort)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Cart.Cart)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.NotFound.Error404)).not.toBeInTheDocument();
  });

  it ('test rout /cart', () => {

    history.push(APPRoute.Cart);

    renderFakeApp();

    expect(screen.getByText(ScreenText.Cart.Filled.PriceAll)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Cart.Filled.PromoCode)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Product.Description)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Catalog.Filled.Sort)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.NotFound.Error404)).not.toBeInTheDocument();
  });

  it ('test rout /fake', () => {

    history.push(FAKE_ROUTE);

    renderFakeApp();

    expect(screen.getByText(ScreenText.NotFound.Error404)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.NotFound.PageNotFound)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Product.Description)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Catalog.Filled.Sort)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Cart.Cart)).not.toBeInTheDocument();
  });
});
