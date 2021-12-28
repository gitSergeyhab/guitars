import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import NotFoundPage from './not-found-page';
import { ScreenText, stateFilled, TestPageText } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';
import { APPRoute } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const header = <NotFoundPage/>;

const FAKE_PATH = '/fake';

describe ('Component NotFoundPage', () => {
  it ('should render correctly', () => {
    renderComponent(header, store, history);

    expect(screen.getByText(ScreenText.NotFound.Error404)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.NotFound.PageNotFound)).toBeInTheDocument();
  });

  it ('should link to Catalog', () => {

    history.push(FAKE_PATH);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={APPRoute.Main}>
              {TestPageText.Main}
            </Route>
            <Route>
              <NotFoundPage/>
              {TestPageText.NotFoundPage}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.NotFoundPage)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

    const link = screen.getByRole('link');
    userEvent.click(link);

    expect(screen.queryByText(TestPageText.NotFoundPage)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Main)).toBeInTheDocument();
  });
});
