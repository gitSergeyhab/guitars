import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SortBlock from './sort-block';
import { renderComponent } from '../../test-utils/render-util';
import { setCurrentPage, setOrder, setSort } from '../../store/actions';
import { ScreenText, stateEmpty, stateFilled } from '../../test-utils/test-constants';
import { ParamName } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const sortBlock = <SortBlock/>;


const BTN_SORT_COUNT = 4;

describe ('Component SortBlock', () => {
  it ('should render correctly', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(screen.getAllByRole('button').length).toBe(BTN_SORT_COUNT);
    expect(screen.getByText(ScreenText.Sort.Price)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Sort.Rating)).toBeInTheDocument();
    expect(screen.getByLabelText(ScreenText.Sort.LabelUp)).toBeInTheDocument();
    expect(screen.getByLabelText(ScreenText.Sort.LabelDown)).toBeInTheDocument();
  });


  it ('should dispatch setCurrentPage, setSort (price), setOrder when stateEmpty and click Price', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(store.getActions()).toEqual([]);

    const btnPrice = screen.getByText(ScreenText.Sort.Price);

    userEvent.click(btnPrice);

    expect(store.getActions()).toEqual([
      setCurrentPage(1),
      setSort(ParamName.Sort.Price),
      setOrder(ParamName.Sort.Asc),
    ]);
  });


  it ('should dispatch setSort(Rating)  when stateFilled and click Price', () => {
    const store = mockStore(stateFilled);
    renderComponent(sortBlock, store, history);

    expect(store.getActions()).toEqual([]);

    const btnRating = screen.getByText(ScreenText.Sort.Rating);

    userEvent.click(btnRating);
    expect(store.getActions()).toEqual([
      setCurrentPage(1),
      setSort(ParamName.Sort.Rating),
    ]);
  });

  it ('should dispatch setCurrentPage, setOrder, setSort (price) when stateEmpty and click asc', () => {
    const store = mockStore(stateEmpty);
    renderComponent(sortBlock, store, history);

    expect(store.getActions()).toEqual([]);

    const btnAsc = screen.getByLabelText(ScreenText.Sort.LabelUp);

    userEvent.click(btnAsc);

    expect(store.getActions()).toEqual([
      setCurrentPage(1),
      setOrder(ParamName.Sort.Asc),
      setSort(ParamName.Sort.Price),
    ]);
  });

  it ('should dispatch setCurrentPage, setOrder, when stateFilled and click desc', () => {
    const store = mockStore(stateFilled);
    renderComponent(sortBlock, store, history);

    expect(store.getActions()).toEqual([]);

    const btnDesc = screen.getByLabelText(ScreenText.Sort.LabelDown);

    userEvent.click(btnDesc);

    expect(store.getActions()).toEqual([
      setCurrentPage(1),
      setOrder(ParamName.Sort.Desc),
    ]);
  });

});
