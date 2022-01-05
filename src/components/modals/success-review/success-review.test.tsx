import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { ScreenText, stateFilled } from '../../../test-utils/test-constants';
import { renderComponent } from '../../../test-utils/render-util';
import { setGuitarToPopup, setPopupType } from '../../../store/actions';
import { APPRoute } from '../../../const';
import SuccessReview from './success-review';


const GUITAR_ID = 1;

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
let store = mockStore(stateFilled);


describe ('Component SuccessReview', () => {
  const successReview = <SuccessReview/>;
  beforeEach(() => store = mockStore(stateFilled));

  it ('should render correctly', () => {
    renderComponent(successReview, store, history);

    expect(screen.getByText(ScreenText.Modal.SuccessReview.Title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Modal.SuccessReview.Continue)).toBeInTheDocument();
  });

  it ('should dispatch setGuitarToPopup, setPopupType when click btnClose', () => {
    renderComponent(successReview, store, history);

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
    renderComponent(successReview, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.type(document.body, '{esc}');

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });

  it ('should dispatch setGuitarToPopup, setPopupType and push /catalog when click btnToCatalog', () => {
    renderComponent(successReview, store, history);
    history.push(`${APPRoute.Guitars}/${GUITAR_ID}`);

    expect(store.getActions()).toEqual([]);

    const btnToCatalog = screen.getByText(ScreenText.Modal.SuccessReview.Continue);
    expect(btnToCatalog).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${APPRoute.Guitars}/${GUITAR_ID}`);

    userEvent.click(btnToCatalog);

    expect(history.location.pathname).toBe(APPRoute.Catalog);
    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });
});

