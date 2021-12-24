import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilterPrice from './filter-price';
import { renderComponent } from '../../../test-utils/render-util';
import { setCurrentPage, setUserMaxPrice, setUserMinPrice } from '../../../store/actions';
import { DefaultPrice, stateFilled } from '../../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);

const TestId = {
  PriceMin: 'priceMin',
  PriceMax: 'priceMax',
}as const;

const TypeText = {
  min: '1',
  max: '9',
} as const;

describe ('Component FilterPrice', () => {
  const filterPrice = <FilterPrice/>;
  it ('should render correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(screen.getByDisplayValue(DefaultPrice.Min.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(DefaultPrice.Max.toString())).toBeInTheDocument();

  });

  it ('should input PriceMin correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(store.getActions()).toEqual([]);

    const priceMin = screen.getByTestId(TestId.PriceMin);

    userEvent.type(priceMin, TypeText.min);

    expect(store.getActions()).toEqual([setUserMinPrice(+`${DefaultPrice.Min}${TypeText.min}`), setCurrentPage(1)]);
  });

  it ('should input PriceMax correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(store.getActions()).toEqual([setUserMinPrice(+`${DefaultPrice.Min}${TypeText.min}`), setCurrentPage(1)]);

    const priceMin = screen.getByTestId(TestId.PriceMax);

    userEvent.type(priceMin, TypeText.max);

    expect(store.getActions()).toEqual([
      setUserMinPrice(+`${DefaultPrice.Min}${TypeText.min}`),
      setCurrentPage(1),
      setUserMaxPrice(+`${DefaultPrice.Max}${TypeText.max}`),
      setCurrentPage(1),
    ]);
  });
});
