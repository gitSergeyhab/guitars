import { MockStore } from '@jedmao/redux-mock-store';
import { render, RenderResult} from '@testing-library/react';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export const renderComponent = (component: JSX.Element, store: MockStore, history: History<unknown>): RenderResult => render(
  <Provider store={store}>
    <Router history={history}>
      {component}
    </Router>
  </Provider>,
);
