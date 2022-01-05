import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SuccessAdd from './success-add';
import { ScreenText, stateFilled } from '../../../test-utils/test-constants';
import { renderComponent } from '../../../test-utils/render-util';
import { setGuitarToPopup, setPopupType } from '../../../store/actions';
import { APPRoute } from '../../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
let store = mockStore(stateFilled);


describe ('Component SuccessAdd', () => {
  const successAdd = <SuccessAdd/>;
  beforeEach(() => store = mockStore(stateFilled));

  it ('should render correctly', () => {
    renderComponent(successAdd, store, history);

    expect(screen.getByText(ScreenText.Modal.SuccessAdd.Title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Modal.SuccessAdd.BtnToCart)).toBeInTheDocument();
  });

  it ('should dispatch setGuitarToPopup, setPopupType when click btnClose', () => {
    renderComponent(successAdd, store, history);

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
    renderComponent(successAdd, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.type(document.body, '{esc}');

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setGuitarToPopup, setPopupType and push /cart when click btnToCart', () => {
    renderComponent(successAdd, store, history);
    history.push(APPRoute.Catalog);

    expect(store.getActions()).toEqual([]);

    const btnToCart = screen.getByText(ScreenText.Modal.SuccessAdd.BtnToCart);
    expect(btnToCart).toBeInTheDocument();
    expect(history.location.pathname).toBe(APPRoute.Catalog);

    userEvent.click(btnToCart);

    expect(history.location.pathname).toBe(APPRoute.Cart);
    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setGuitarToPopup, setPopupType and push /catalog when click btnToCatalog', () => {
    renderComponent(successAdd, store, history);
    history.push(APPRoute.Cart);

    expect(store.getActions()).toEqual([]);

    const btnToCatalog = screen.getByText(ScreenText.Modal.SuccessAdd.BtnCancel);
    expect(btnToCatalog).toBeInTheDocument();
    expect(history.location.pathname).toBe(APPRoute.Cart);

    userEvent.click(btnToCatalog);

    expect(history.location.pathname).toBe(APPRoute.Catalog);
    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });
});

