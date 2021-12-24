import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import GuitarCard from './guitar-card';
import { makeFakeGuitarWithComment } from '../../test-utils/test-mocks';
import { renderComponent } from '../../test-utils/render-util';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { ScreenText, stateEmpty, TestPageText } from '../../test-utils/test-constants';
import { APPRoute, PopupType } from '../../const';


const TEST_ID = 1;

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateEmpty);

const fakeGuitar = makeFakeGuitarWithComment();
const guitar = {...fakeGuitar, id: TEST_ID};


describe ('Component GuitarCard', () => {
  const guitarCard = <GuitarCard guitar={guitar}/>;
  it ('should render correctly', () => {
    renderComponent(guitarCard, store, history);

    expect(screen.getByText(ScreenText.Card.Info)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Card.Buy)).toBeInTheDocument();

  });

  it ('should dispatch setGuitarToPopup, setPopupType when click btnBuy', () => {
    renderComponent(guitarCard, store, history);

    expect(store.getActions()).toEqual([]);

    const btnBuy = screen.getByText(ScreenText.Card.Buy);

    userEvent.click(btnBuy);

    expect(store.getActions()).toEqual([
      setGuitarToPopup(guitar),
      setPopupType(PopupType.CartAdd),
    ]);
  });

  it ('should dispatch ... + fetchTheGuitar, fetchComments when click btnInfo', () => {

    history.push(APPRoute.Main);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={APPRoute.Guitars}>
              {TestPageText.Guitars}
            </Route>
            <Route exact path={APPRoute.Main}>
              <GuitarCard guitar={guitar}/>
              {TestPageText.Main}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(TestPageText.Main)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Guitars)).not.toBeInTheDocument();

    const btnInfo = screen.getByText(ScreenText.Card.Info);

    userEvent.click(btnInfo);

    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();
    expect(screen.getByText(TestPageText.Guitars)).toBeInTheDocument();
  });
});

