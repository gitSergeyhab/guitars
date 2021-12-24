import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { ScreenText, stateFilled, TestPageText } from '../../test-utils/test-constants';
import Footer from './footer';
import { APPRoute } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);

describe ('Component Footer', () => {
  it ('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer/>
      </Router>,
    );

    expect(screen.getByText(ScreenText.Footer.About)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Footer.Contacts)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Footer.Info)).toBeInTheDocument();
  });

  it ('should link to Main', () => {

    history.push(APPRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Footer/>
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

    expect(screen.getByText(TestPageText.Cart)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

    const linkToMain = screen.getByAltText(ScreenText.Logo);
    expect(linkToMain).toBeInTheDocument();

    userEvent.click(linkToMain);

    expect(screen.queryByText(TestPageText.Cart)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Main)).toBeInTheDocument();
  });
});
