import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import BreadcrumbProduct from './breadcramb-product';
import { stateFilled, TestPageText } from '../../../test-utils/test-constants';
import { APPRoute } from '../../../const';


const TEST_NAME = 'TEST_NAME';

const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const history = createMemoryHistory();


describe ('Component BreadcrumbProduct', () => {
  it ('should render correctly', () => {
    render(
      <Router history={history}>
        <BreadcrumbProduct name={TEST_NAME}/>
      </Router>,
    );

    expect(screen.getByText(TEST_NAME)).toBeInTheDocument();
  });

  it ('should link correctly', () => {

    history.push(APPRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <BreadcrumbProduct name={TEST_NAME}/>
          <Switch>
            <Route exact path={APPRoute.Guitars}>
              {TestPageText.Guitars}
            </Route>
            <Route exact path={APPRoute.Cart}>
              {TestPageText.Cart}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Guitars)).not.toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Guitars)).toBeInTheDocument();
  });
});
