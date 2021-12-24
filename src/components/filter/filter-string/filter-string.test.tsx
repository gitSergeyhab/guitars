import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilterString from './filter-string';
import { renderComponent } from '../../../test-utils/render-util';
import { setCheckedStrings, setCurrentPage } from '../../../store/actions';
import { stateEmpty } from '../../../test-utils/test-constants';
import { ALL_STRINGS } from '../../../const';


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

  it ('should change checkbox correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(store.getActions()).toEqual([]);

    const fourStringGuitar = screen.getByText(ALL_STRINGS[0]);

    userEvent.click(fourStringGuitar);

    expect(store.getActions()).toEqual([
      setCheckedStrings([ALL_STRINGS[0]]),
      setCurrentPage(1),
    ]);
  });

});