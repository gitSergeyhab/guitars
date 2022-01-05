import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartAdd from './cart-add';
import { ScreenText, stateFilled } from '../../../test-utils/test-constants';
import { Guitar } from '../../../types/types';
import { renderComponent } from '../../../test-utils/render-util';
import { setCartGuitars, setGuitarToPopup, setPopupType } from '../../../store/actions';
import { changeGuitarInCart } from '../../../utils/utils';
import { PopupType } from '../../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
let store = mockStore(stateFilled);

const guitar = stateFilled.Cart.guitarPopup as Guitar;


describe ('Component CartAdd', () => {
  const cartAdd = <CartAdd guitar={guitar}/>;
  beforeEach(() => store = mockStore(stateFilled));

  it ('should render correctly', () => {
    renderComponent(cartAdd, store, history);

    expect(screen.getByText(ScreenText.Modal.CartAdd.Btn)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Modal.CartAdd.Title)).toBeInTheDocument();
  });

  it ('should dispatch setGuitarToPopup, setPopupType when click btnClose', () => {
    renderComponent(cartAdd, store, history);

    expect(store.getActions()).toEqual([]);

    const btnClose = screen.getByLabelText(ScreenText.Modal.Label.Close);
    expect(btnClose).toBeInTheDocument();

    userEvent.click(btnClose);

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setGuitarToPopup, setPopupType when keyDown Esc', () => {
    renderComponent(cartAdd, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.type(document.body, '{esc}');

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setCartGuitars, setPopupType when click btnAdd', () => {
    renderComponent(cartAdd, store, history);

    const cartGuitarsOrigin = stateFilled.Cart.cartGuitars;
    const cartGuitars = [...cartGuitarsOrigin];
    const newCartGuitars = changeGuitarInCart(guitar, cartGuitars, true);

    expect(store.getActions()).toEqual([]);

    const btnAdd = screen.getByText(ScreenText.Modal.CartAdd.Btn);
    expect(btnAdd).toBeInTheDocument();

    userEvent.click(btnAdd);

    expect(store.getActions()).toEqual([
      setCartGuitars(newCartGuitars),
      setPopupType(PopupType.SuccessAddToCard),
    ]);
  });
});

