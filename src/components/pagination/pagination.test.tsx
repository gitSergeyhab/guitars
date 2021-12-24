import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Pagination from './pagination';
import { renderComponent } from '../../test-utils/render-util';
import { State } from '../../types/types';
import { setCurrentPage } from '../../store/actions';
import { stateFilled } from '../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const pagination = <Pagination/>;


const MAX_PAGE_COUNT = 5;
const MIN_PAGE_COUNT = 4;
const TEXT_SECOND_PAGE = '2';

describe ('Component Pagination', () => {
  it ('should render correctly', () => {
    renderComponent(pagination, store, history);

    const state = store.getState() as State;
    const pageCount = Math.ceil(state.Pagination.guitarCount / state.Pagination.limit);
    const minCountDisplayedPage = Math.min(MIN_PAGE_COUNT, pageCount);

    expect(screen.getByText(state.Pagination.currentPage.toString())).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeLessThanOrEqual(MAX_PAGE_COUNT);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(minCountDisplayedPage);
  });

  it ('should dispatch setCurrentPage when link click secondPage', () => {
    renderComponent(pagination, store, history);

    expect(store.getActions()).toEqual([]);

    const secondPage = screen.getByText(TEXT_SECOND_PAGE);
    expect(secondPage).toBeInTheDocument();

    userEvent.click(secondPage);

    expect(store.getActions()).toEqual([setCurrentPage(+TEXT_SECOND_PAGE)]);
  });
});
