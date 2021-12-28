import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilterType from './filter-type';
import { renderComponent } from '../../../test-utils/render-util';
import { setCheckedStrings, setCurrentPage, setUserTypes } from '../../../store/actions';
import { stateEmpty } from '../../../test-utils/test-constants';
import { GuitarType, GUITAR_TYPES } from '../../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateEmpty);


const TEST_ID = 'type-acoustic';

describe ('Component FilterType', () => {
  const filterPrice = <FilterType/>;
  it ('should render correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(screen.getAllByRole('checkbox').length).toBe(GUITAR_TYPES.length);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();

  });

  it ('should change checkbox correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(store.getActions()).toEqual([]);

    const acoustic = screen.getByTestId(TEST_ID);

    userEvent.click(acoustic);

    expect(store.getActions()).toEqual([
      setCheckedStrings([]),
      setUserTypes([GuitarType.Acoustic]),
      setCurrentPage(1),
    ]);
  });

});
