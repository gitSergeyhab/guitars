import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilterPrice from './filter-price';
import { renderComponent } from '../../../test-utils/render-util';
import { DefaultPrice, stateFilled } from '../../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateFilled);


const TestId = {
  PriceMin: 'priceMin',
  PriceMax: 'priceMax',
}as const;

const TypeText = {
  min: '1000',
  max: '9000',
} as const;

describe ('Component FilterPrice', () => {
  const filterPrice = <FilterPrice/>;
  it ('should render correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(screen.getByPlaceholderText(DefaultPrice.Min.toString())).toBeInTheDocument();
    expect(screen.getByPlaceholderText(DefaultPrice.Max.toString())).toBeInTheDocument();
  });

  it ('should input PriceMin correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(screen.queryByDisplayValue(TypeText.min)).not.toBeInTheDocument();

    const priceMinInput = screen.getByTestId(TestId.PriceMin);

    userEvent.type(priceMinInput, TypeText.min);

    expect(screen.getByDisplayValue(TypeText.min)).toBeInTheDocument();
  });

  it ('should input PriceMax correctly', () => {
    renderComponent(filterPrice, store, history);

    expect(screen.queryByDisplayValue(TypeText.max)).not.toBeInTheDocument();

    const priceMinInput = screen.getByTestId(TestId.PriceMax);

    userEvent.type(priceMinInput, TypeText.max);

    expect(screen.getByDisplayValue(TypeText.max)).toBeInTheDocument();
  });
});
