import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilterString from './filter-string';
import { renderComponent } from '../../../test-utils/render-util';
import { stateEmpty } from '../../../test-utils/test-constants';
import { ALL_STRINGS, DEFAULT_PAGE_FOR_PUSH, GUITARS_PER_PAGE } from '../../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateEmpty);


describe ('Component FilterString', () => {
  const filterPrice = <FilterString/>;
  it ('should render correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(screen.getAllByRole('checkbox').length).toBe(ALL_STRINGS.length);
    expect(screen.getByText(ALL_STRINGS[0])).toBeInTheDocument();

  });

  it ('should push to url correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(history.location.search).toBe('');

    const fourStringGuitar = screen.getByText(ALL_STRINGS[0]);

    userEvent.click(fourStringGuitar);

    expect(history.location.search).toBe(`?_limit=${GUITARS_PER_PAGE}&stringCount%5B0%5D=${ALL_STRINGS[0]}&_page=${DEFAULT_PAGE_FOR_PUSH}`);
  });

});
