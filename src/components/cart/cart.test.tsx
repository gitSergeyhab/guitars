import { screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Cart, { TEST_CART_ID } from './cart';
import { ScreenText, stateEmpty, stateFilled } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const cart = <Cart/>;

describe ('Component Cart', () => {
  it ('should render correctly cart filled', () => {
    const store = mockStore(stateFilled);
    renderComponent(cart, store, history);

    expect(screen.getByTestId(TEST_CART_ID)).toBeInTheDocument();
  });


  it ('should render correctly when cart empty', () => {
    const store = mockStore(stateEmpty);
    renderComponent(cart, store, history);

    expect(screen.getByText(ScreenText.Cart.Empty)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Cart.Filled.PriceAll)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Cart.Filled.PromoCode)).not.toBeInTheDocument();
  });
});
