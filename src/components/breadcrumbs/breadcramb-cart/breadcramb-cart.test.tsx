import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import BreadcrumbCart from './breadcramb-cart';
import { ScreenText, stateFilled, TestPageText } from '../../../test-utils/test-constants';
import { APPRoute } from '../../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);

describe ('Component BreadcrumbCart', () => {
  it ('should render correctly', () => {
    render(
      <Router history={history}>
        <BreadcrumbCart/>
      </Router>,
    );

    expect(screen.getByText(ScreenText.Breadcrumbs.Cart)).toBeInTheDocument();
  });

  it ('should link correctly', () => {

    history.push(APPRoute.Main);

    render(
      <Provider store={store}>
        <Router history={history}>
          <BreadcrumbCart/>
          <Switch>
            <Route exact path={APPRoute.Cart}>
              {TestPageText.Cart}
            </Route>
            <Route exact path={APPRoute.Main}>
              {TestPageText.Main}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Main)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
  });
});
