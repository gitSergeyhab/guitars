import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartFooter from './cart-footer';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const cartFooter = <CartFooter/>;

const CouponText = {
  Correct: /Промокод принят/i,
  Incorrect: /неверный промокод/i,
} as const;

describe ('Component CartFooter', () => {
  it ('should render correctly when cart filled and correct coupon', () => {
    const store = mockStore(stateFilled);
    renderComponent(cartFooter, store, history);

    expect(screen.getByText(ScreenText.Cart.Filled.PriceAll)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Cart.Filled.PromoCode)).toBeInTheDocument();

    expect(screen.getByText(CouponText.Correct)).toBeInTheDocument();
    expect(screen.queryByText(CouponText.Incorrect)).not.toBeInTheDocument();
  });

  it ('should render correctly when cart filled and there is not coupon', () => {
    const store = mockStore({...stateFilled, Cart: {...stateFilled.Cart, coupon: ''}});

    renderComponent(cartFooter, store, history);

    expect(screen.getByText(ScreenText.Cart.Filled.PriceAll)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Cart.Filled.PromoCode)).toBeInTheDocument();

    expect(screen.queryByText(CouponText.Correct)).not.toBeInTheDocument();
    expect(screen.queryByText(CouponText.Incorrect)).not.toBeInTheDocument();
  });

  it ('should render correctly when cart filled and incorrect coupon', () => {
    const store = mockStore({...stateFilled, Cart: {...stateFilled.Cart, coupon: null}});

    renderComponent(cartFooter, store, history);

    expect(screen.getByText(ScreenText.Cart.Filled.PriceAll)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Cart.Filled.PromoCode)).toBeInTheDocument();

    expect(screen.queryByText(CouponText.Correct)).not.toBeInTheDocument();
    expect(screen.getByText(CouponText.Incorrect)).toBeInTheDocument();
  });
});
