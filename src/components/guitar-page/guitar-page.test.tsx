import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import GuitarPage from './guitar-page';
import { renderComponent } from '../../test-utils/render-util';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const guitarPage = <GuitarPage/>;

describe ('GuitarPage Component', () => {
  it ('LOADED: should render correctly', () => {
    const store = mockStore(stateFilled);

    renderComponent(guitarPage, store, history);

    expect(screen.getByText(ScreenText.Product.Description)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Product.Characteristic)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Loading)).not.toBeInTheDocument();
  });

  it ('LOADING: should render Spinner', () => {
    const store = mockStore({...stateFilled, Guitar: {isLoading: true}});

    renderComponent(guitarPage, store, history);

    expect(screen.getByText(ScreenText.Loading)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Product.Description)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Product.Characteristic)).not.toBeInTheDocument();
  });
});
