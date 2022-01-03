import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilterType from './filter-type';
import { renderComponent } from '../../../test-utils/render-util';
import { stateEmpty } from '../../../test-utils/test-constants';
import { GUITARS_PER_PAGE, GuitarType, GUITAR_TYPES } from '../../../const';


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

  it ('should push to url correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(history.location.search).toBe('');

    const acoustic = screen.getByTestId(TEST_ID);

    userEvent.click(acoustic);

    expect(history.location.search).toBe(`?_limit=${GUITARS_PER_PAGE}&type%5B0%5D=${GuitarType.Acoustic}&_page=${1}`);
  });

});
