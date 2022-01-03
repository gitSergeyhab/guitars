import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Pagination from './pagination';
import { renderComponent } from '../../test-utils/render-util';
import { stateFilled } from '../../test-utils/test-constants';
import { GUITARS_PER_PAGE } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const pagination = <Pagination/>;


const MAX_PAGE_COUNT = 5;
const MIN_PAGE_COUNT = 4;
const TEXT_FIRST_PAGE = '1';
const TEXT_SECOND_PAGE = '2';

describe ('Component Pagination', () => {
  it ('should render correctly', () => {
    renderComponent(pagination, store, history);

    const pageCount = Math.ceil(stateFilled.Catalog.guitarCount / GUITARS_PER_PAGE);
    const minCountDisplayedPage = Math.min(MIN_PAGE_COUNT, pageCount);

    expect(screen.getByText(TEXT_FIRST_PAGE)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeLessThanOrEqual(MAX_PAGE_COUNT);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(minCountDisplayedPage);
  });

  it ('should push page=2 when link click secondPage', () => {

    renderComponent(pagination, store, history);
    expect(history.location.search).toBe('');
    const secondPage = screen.getByText(TEXT_SECOND_PAGE);
    expect(secondPage).toBeInTheDocument();

    userEvent.click(secondPage);

    expect(history.location.search).toBe(`?_limit=${GUITARS_PER_PAGE}&_page=${TEXT_SECOND_PAGE}`);
  });
});
