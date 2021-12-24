import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import BreadcrumbCatalog from './breadcramb-catalog';
import { ScreenText, stateFilled, TestPageText } from '../../../test-utils/test-constants';
import { APPRoute } from '../../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);


describe ('Component BreadcrumbCatalog', () => {
  it ('should render correctly', () => {
    render(
      <Router history={history}>
        <BreadcrumbCatalog/>
      </Router>,
    );

    expect(screen.getByText(ScreenText.Breadcrumbs.Catalog)).toBeInTheDocument();
  });

  it ('should link correctly', () => {

    history.push(APPRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <BreadcrumbCatalog/>
          <Switch>
            <Route exact path={APPRoute.Catalog}>
              {TestPageText.Catalog}
            </Route>
            <Route exact path={APPRoute.Cart}>
              {TestPageText.Cart}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Catalog)).not.toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Catalog)).toBeInTheDocument();
  });
});
