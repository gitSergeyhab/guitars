import thunk from 'redux-thunk';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Spinner from './spinner';
import { renderComponent } from '../../test-utils/render-util';
import { ScreenText, stateEmpty } from '../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateEmpty);


describe ('Component Spinner', () => {
  const spinner = <Spinner/>;
  it ('should render correctly', () => {
    renderComponent(spinner, store, history);

    expect(screen.getByText(ScreenText.Loading)).toBeInTheDocument();
  });
});

