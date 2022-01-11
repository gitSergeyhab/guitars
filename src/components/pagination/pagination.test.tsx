import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Pagination from './pagination';
import { renderComponent } from '../../test-utils/render-util';
import { stateFilled } from '../../test-utils/test-constants';
import { GUITARS_PER_PAGE } from '../../const';


const enum PageCount {
  Max = 5,
  Min = 4,
}

const enum TextPage {
  First = '1',
  Second = '2',
}

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);
const pagination = <Pagination/>;

describe ('Component Pagination', () => {
  it ('should render correctly', () => {
    renderComponent(pagination, store, history);

    const pageCount = Math.ceil(stateFilled.Catalog.guitarCount / GUITARS_PER_PAGE);
    const minCountDisplayedPage = Math.min(PageCount.Min, pageCount);

    expect(screen.getByText(TextPage.First)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeLessThanOrEqual(PageCount.Max);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(minCountDisplayedPage);
  });

  it ('should push page=2 when link click secondPage', () => {

    renderComponent(pagination, store, history);
    expect(history.location.search).toBe('');
    const secondPage = screen.getByText(TextPage.Second);
    expect(secondPage).toBeInTheDocument();

    userEvent.click(secondPage);

    expect(history.location.search).toBe(`?_limit=${GUITARS_PER_PAGE}&_page=${TextPage.Second}`);
  });
});
