import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import HeaderSearch from './header-search';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';


const TEST_TEXT = 'TEST_TEXT';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const header = <HeaderSearch/>;

describe ('Component HeaderSearch', () => {
  it ('should render correctly', () => {
    renderComponent(header, store, history);

    expect(screen.getByPlaceholderText(ScreenText.Header.PlaceHolder)).toBeInTheDocument();
  });

  it ('should display value when type', () => {

    renderComponent(header, store, history);

    const input = screen.getByPlaceholderText(ScreenText.Header.PlaceHolder);

    expect(screen.queryByDisplayValue(TEST_TEXT)).not.toBeInTheDocument();

    userEvent.type(input, TEST_TEXT);

    expect(screen.getByDisplayValue(TEST_TEXT)).toBeInTheDocument();
  });
});
