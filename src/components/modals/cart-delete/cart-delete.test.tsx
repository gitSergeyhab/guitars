import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartDelete from './cart-delete';
import { ScreenText, stateFilled } from '../../../test-utils/test-constants';
import { Guitar } from '../../../types/types';
import { renderComponent } from '../../../test-utils/render-util';
import { setCartGuitars, setGuitarToPopup, setPopupType } from '../../../store/actions';
import { changeGuitarInCart } from '../../../utils/utils';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
let store = mockStore(stateFilled);

const guitar = stateFilled.Cart.guitarPopup as Guitar;


describe ('Component CartDelete', () => {
  const cartDelete = <CartDelete guitar={guitar}/>;
  beforeEach(() => store = mockStore(stateFilled));

  it ('should render correctly', () => {
    renderComponent(cartDelete, store, history);

    expect(screen.getByText(ScreenText.Modal.CardDelete.Title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Modal.CardDelete.BtnDelete)).toBeInTheDocument();
  });

  it ('should dispatch setGuitarToPopup, setPopupType when click btnClose', () => {
    renderComponent(cartDelete, store, history);

    expect(store.getActions()).toEqual([]);

    const btnClose = screen.getByLabelText(ScreenText.Modal.Label.Close);
    expect(btnClose).toBeInTheDocument();

    userEvent.click(btnClose);

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setGuitarToPopup, setPopupType when click Cancel', () => {
    renderComponent(cartDelete, store, history);

    expect(store.getActions()).toEqual([]);

    const btnCancel = screen.getByText(ScreenText.Modal.CardDelete.BtnCancel);
    expect(btnCancel).toBeInTheDocument();

    userEvent.click(btnCancel);

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setGuitarToPopup, setPopupType when keyDown Esc', () => {
    renderComponent(cartDelete, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.type(document.body, '{esc}');

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setCartGuitars when click btnDelete', () => {
    renderComponent(cartDelete, store, history);

    const cartGuitarsOrigin = stateFilled.Cart.cartGuitars;
    const cartGuitars = [...cartGuitarsOrigin];
    const newCartGuitars = changeGuitarInCart(guitar, cartGuitars, false);

    expect(store.getActions()).toEqual([]);

    const btnDelete = screen.getByText(ScreenText.Modal.CardDelete.BtnDelete);
    expect(btnDelete).toBeInTheDocument();

    userEvent.click(btnDelete);

    expect(store.getActions()).toEqual([setCartGuitars(newCartGuitars)]);
  });
});

