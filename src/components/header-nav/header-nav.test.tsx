import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import HeaderNav from './header-nav';
import { ScreenText, stateFilled, TestPageText } from '../../test-utils/test-constants';
import { APPRoute } from '../../const';
import { renderComponent } from '../../test-utils/render-util';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const header = <HeaderNav/>;

describe ('Component HeaderNav', () => {
  it ('should render correctly', () => {
    renderComponent(header, store, history);

    expect(screen.getByText(ScreenText.Header.About)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Header.Catalog)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Header.Where)).toBeInTheDocument();
  });

  it ('should link to Catalog', () => {

    history.push(APPRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNav/>
          <Switch>
            <Route exact path={APPRoute.Cart}>
              {TestPageText.Cart}
            </Route>
            <Route exact path={APPRoute.Catalog}>
              {TestPageText.Catalog}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Catalog)).not.toBeInTheDocument();

    const linkToCart = screen.getByText(ScreenText.Header.Catalog);
    userEvent.click(linkToCart);

    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Catalog)).toBeInTheDocument();
  });

  it ('should link by about to NotFoundPage', () => {

    history.push(APPRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNav/>
          <Switch>
            <Route exact path={APPRoute.Cart}>
              {TestPageText.Cart}
            </Route>
            <Route>
              {TestPageText.NotFoundPage}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.NotFoundPage)).not.toBeInTheDocument();

    const linkToAbout = screen.getByText(ScreenText.Header.About);
    userEvent.click(linkToAbout);

    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.NotFoundPage)).toBeInTheDocument();
  });


  it ('should link by Where to NotFoundPage', () => {

    history.push(APPRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNav/>
          <Switch>
            <Route exact path={APPRoute.Cart}>
              {TestPageText.Cart}
            </Route>
            <Route>
              {TestPageText.NotFoundPage}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.NotFoundPage)).not.toBeInTheDocument();

    const linkToWhere = screen.getByText(ScreenText.Header.Where);
    userEvent.click(linkToWhere);

    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.NotFoundPage)).toBeInTheDocument();
  });
});
