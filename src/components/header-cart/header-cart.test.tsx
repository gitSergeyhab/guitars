import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import HeaderCart from './header-cart';
import { stateFilled, TestPageText } from '../../test-utils/test-constants';
import { APPRoute } from '../../const';
import { renderComponent } from '../../test-utils/render-util';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const header = <HeaderCart/>;

describe ('Component HeaderCart', () => {
  it ('should render correctly', () => {
    renderComponent(header, store, history);
    const guitarCount = stateFilled.Cart.cartGuitars.reduce((acc, item) => acc + item.count , 0);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(guitarCount.toString())).toBeInTheDocument();
  });

  it ('should link to Cart', () => {

    history.push(APPRoute.Main);

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderCart/>
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

    const linkToCart = screen.getByRole('link');
    userEvent.click(linkToCart);

    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
  });
});
