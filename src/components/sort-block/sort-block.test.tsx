import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SortBlock from './sort-block';
import { renderComponent } from '../../test-utils/render-util';
import { ScreenText, stateEmpty } from '../../test-utils/test-constants';
import { DEFAULT_PAGE_FOR_PUSH, GUITARS_PER_PAGE, ParamName } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const sortBlock = <SortBlock/>;

const BTN_SORT_COUNT = 4;

describe ('Component SortBlock', () => {
  beforeEach(() => history.push(''));
  it ('should render correctly', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(screen.getAllByRole('button').length).toBe(BTN_SORT_COUNT);
    expect(screen.getByText(ScreenText.Sort.Price)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Sort.Rating)).toBeInTheDocument();
    expect(screen.getByLabelText(ScreenText.Sort.LabelUp)).toBeInTheDocument();
    expect(screen.getByLabelText(ScreenText.Sort.LabelDown)).toBeInTheDocument();
  });


  it ('should push ?_limit=9&_sort=price&_order=asc&_page=1 when stateEmpty and click Price', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(history.location.search).toBe('');

    const btnPrice = screen.getByText(ScreenText.Sort.Price);

    userEvent.click(btnPrice);

    expect(history.location.search).toBe(
      `?_limit=${GUITARS_PER_PAGE}&${ParamName.Sort.Sort}=${ParamName.Sort.Price}&${ParamName.Sort.Order}=${ParamName.Sort.Asc}&_page=${DEFAULT_PAGE_FOR_PUSH}`,
    );
  });

  it ('should push ?_limit=9&_sort=rating&_order=asc&_page=1 when stateEmpty and click Rating', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(history.location.search).toBe('');

    const btnRating = screen.getByText(ScreenText.Sort.Rating);

    userEvent.click(btnRating);

    expect(history.location.search).toBe(
      `?_limit=${GUITARS_PER_PAGE}&${ParamName.Sort.Sort}=${ParamName.Sort.Rating}&${ParamName.Sort.Order}=${ParamName.Sort.Asc}&_page=${DEFAULT_PAGE_FOR_PUSH}`,
    );
  });

  it ('should push ?_limit=9&_order=asc&_sort=price&_page=1 when stateEmpty and click Asc', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(history.location.search).toBe('');

    const btnAsc = screen.getByLabelText(ScreenText.Sort.LabelUp);

    userEvent.click(btnAsc);

    expect(history.location.search).toBe(
      `?_limit=${GUITARS_PER_PAGE}&${ParamName.Sort.Order}=${ParamName.Sort.Asc}&${ParamName.Sort.Sort}=${ParamName.Sort.Price}&_page=${DEFAULT_PAGE_FOR_PUSH}`,
    );
  });

  it ('should push ?_limit=9&_order=desc&_sort=price&_page=1 when stateEmpty and click Desc', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(history.location.search).toBe('');

    const btnDesc = screen.getByLabelText(ScreenText.Sort.LabelDown);

    userEvent.click(btnDesc);

    expect(history.location.search).toBe(
      `?_limit=${GUITARS_PER_PAGE}&${ParamName.Sort.Order}=${ParamName.Sort.Desc}&${ParamName.Sort.Sort}=${ParamName.Sort.Price}&_page=${DEFAULT_PAGE_FOR_PUSH}`,
    );
  });
});
