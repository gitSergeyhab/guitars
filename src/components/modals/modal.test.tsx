import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Modal from './modal';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';
import { PopupType } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const modals = <Modal/>;


describe ('Component Modal', () => {
  it ('should render popupAdd when PopupType.CartAdd and popupGuitar', () => {
    const state = {...stateFilled, Cart: {...stateFilled.Cart, popupType: PopupType.CartAdd }};
    const store = mockStore(state);
    renderComponent(modals, store, history);

    expect(screen.getByText(ScreenText.Modal.CartAdd.Title)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Modal.CardDelete.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.Review.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessAdd.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessReview.Title)).not.toBeInTheDocument();
  });

  it ('should render popupDelete when PopupType.CartDelete and popupGuitar', () => {
    const state = {...stateFilled, Cart: {...stateFilled.Cart, popupType: PopupType.CartDelete }};
    const store = mockStore(state);
    renderComponent(modals, store, history);

    expect(screen.getByText(ScreenText.Modal.CardDelete.Title)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Modal.CartAdd.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.Review.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessAdd.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessReview.Title)).not.toBeInTheDocument();
  });

  it ('should render Review when PopupType.Review and popupGuitar', () => {
    const state = {...stateFilled, Cart: {...stateFilled.Cart, popupType: PopupType.Review }};
    const store = mockStore(state);
    renderComponent(modals, store, history);

    expect(screen.getByText(ScreenText.Modal.Review.Title)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Modal.CardDelete.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.CartAdd.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessAdd.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessReview.Title)).not.toBeInTheDocument();
  });

  it ('should render popupSuccessReview when PopupType.SuccessReview', () => {
    const state = {...stateFilled, Cart: {...stateFilled.Cart, popupType: PopupType.SuccessReview }};
    const store = mockStore(state);
    renderComponent(modals, store, history);

    expect(screen.getByText(ScreenText.Modal.SuccessReview.Title)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Modal.Review.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.CardDelete.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.CartAdd.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.SuccessAdd.Title)).not.toBeInTheDocument();
  });


  it ('should render popupSuccessAdd when PopupType.SuccessAddToCard', () => {
    const state = {...stateFilled, Cart: {...stateFilled.Cart, popupType: PopupType.SuccessAddToCard }};
    const store = mockStore(state);
    renderComponent(modals, store, history);

    expect(screen.getByText(ScreenText.Modal.SuccessAdd.Title)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Modal.SuccessReview.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.Review.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.CardDelete.Title)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Modal.CartAdd.Title)).not.toBeInTheDocument();
  });
});
