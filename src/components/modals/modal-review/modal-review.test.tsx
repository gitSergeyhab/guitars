import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ModalReview from './modal-review';
import { ScreenText, stateFilled } from '../../../test-utils/test-constants';
import { Guitar } from '../../../types/types';
import { renderComponent } from '../../../test-utils/render-util';
import { setGuitarToPopup, setPopupType } from '../../../store/actions';
import { MAX_RATING } from '../../../const';


const TEST_TEXT = 'TEST_TEXT';
const TEST_ID = 'user-name';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
let store = mockStore(stateFilled);

const guitar = stateFilled.Cart.guitarPopup as Guitar;


describe ('Component ModalReview', () => {
  const modalReview = <ModalReview guitar={guitar}/>;
  beforeEach(() => store = mockStore(stateFilled));

  it ('should render correctly', () => {
    renderComponent(modalReview, store, history);

    expect(screen.getByText(ScreenText.Modal.Review.Title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Modal.Review.Send)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(MAX_RATING);
  });

  it ('should checked radio by click', () => {
    renderComponent(modalReview, store, history);

    const lastBtn = screen.getAllByRole('radio')[0];

    expect(lastBtn).not.toBeChecked();

    userEvent.click(lastBtn);

    expect(lastBtn).toBeChecked();
  });

  it ('should input name when type', () => {
    renderComponent(modalReview, store, history);

    const name = screen.getByTestId(TEST_ID);

    expect(screen.queryByDisplayValue(TEST_TEXT)).not.toBeInTheDocument();

    userEvent.type(name, TEST_TEXT);

    expect(screen.getByDisplayValue(TEST_TEXT)).toBeInTheDocument();
  });

  it ('should dispatch setGuitarToPopup, setPopupType when click btnClose', () => {
    renderComponent(modalReview, store, history);

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
    renderComponent(modalReview, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.type(document.body, '{esc}');

    expect(store.getActions()).toEqual([
      setGuitarToPopup(null),
      setPopupType(null),
    ]);
  });
});

