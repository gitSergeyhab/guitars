import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import OneCartGuitar from './one-cart-guitar';
import { renderComponent } from '../../test-utils/render-util';
import { makeStringPrice } from '../../utils/utils';
import { setCartGuitars, setGuitarToPopup, setPopupType } from '../../store/actions';
import { stateFilled } from '../../test-utils/test-constants';
import { PopupType } from '../../const';


const enum AriaLabel {
  Minus = 'Уменьшить количество',
  Plus = 'Увеличить количество',

}

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
let store = mockStore(stateFilled);

const cartGuitars = stateFilled.Cart.cartGuitars;
const cartGuitar = cartGuitars[0];
const cartGuitarsPlus = [{...cartGuitar, count: cartGuitar.count + 1}];
const cartGuitarsMinus = [{...cartGuitar, count: cartGuitar.count - 1}];

const name = new RegExp(cartGuitar.guitar.name, 'i');
const vendorCode = new RegExp(cartGuitar.guitar.vendorCode, 'i');

const priceByOne = cartGuitar.guitar.price;
const priceByOneString = new RegExp(makeStringPrice(priceByOne) , 'i');


describe ('Component OneCartGuitar', () => {
  const oneCartGuitar = <OneCartGuitar cartGuitar={cartGuitar}/>;
  beforeEach(() => store = mockStore(stateFilled));

  it ('should render correctly', () => {
    renderComponent(oneCartGuitar, store, history);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(vendorCode)).toBeInTheDocument();
    expect(screen.getByText(priceByOneString)).toBeInTheDocument();
  });

  it ('should dispatch setCartGuitars(cartGuitarsPlus) by plusBtn', () => {
    renderComponent(oneCartGuitar, store, history);

    const plusBtn = screen.getByLabelText(AriaLabel.Plus);
    expect(plusBtn).toBeInTheDocument();

    expect(store.getActions()).toEqual([]);

    userEvent.click(plusBtn);

    expect(store.getActions()).toEqual([
      setCartGuitars(cartGuitarsPlus),
    ]);

  });

  it ('should dispatch setCartGuitars(cartGuitarsMinus) by minusBtn when count > 1', () => {
    renderComponent(oneCartGuitar, store, history);

    const minusBtn = screen.getByLabelText(AriaLabel.Minus);
    expect(minusBtn).toBeInTheDocument();

    expect(store.getActions()).toEqual([]);

    userEvent.click(minusBtn);

    expect(store.getActions()).toEqual([
      setCartGuitars(cartGuitarsMinus),
    ]);
  });

  it ('should dispatch setCartGuitars(cartGuitarsMinus) by minusBtn when count === 1', () => {
    const cartGuitarsWithCountOne = [{...cartGuitar, count: 1}];

    const state = {...stateFilled, Cart: {...stateFilled.Cart, cartGuitars: cartGuitarsWithCountOne}};
    const storeWithCountOne = mockStore(state);

    const oneCartGuitarWithCountOne = <OneCartGuitar cartGuitar={state.Cart.cartGuitars[0]}/>;

    renderComponent(oneCartGuitarWithCountOne, storeWithCountOne, history);

    const minusBtn = screen.getByLabelText(AriaLabel.Minus);
    expect(minusBtn).toBeInTheDocument();

    expect(storeWithCountOne.getActions()).toEqual([]);

    userEvent.click(minusBtn);

    expect(storeWithCountOne.getActions()).toEqual([
      setGuitarToPopup(cartGuitar.guitar),
      setPopupType(PopupType.CartDelete),
    ]);
  });
});

