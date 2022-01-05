import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import GuitarPageProduct from './guitar-page-product';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';
import { makeFakeGuitar } from '../../test-utils/test-mocks';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitar = makeFakeGuitar();
const product = <GuitarPageProduct guitar={guitar}/>;

const HIDDEN_CLASS = 'hidden';

const title = new RegExp(guitar.name, 'i');
const description = new RegExp(guitar.description, 'i');


describe ('Component GuitarPageProduct', () => {
  it ('should render correctly when cart filled and correct coupon', () => {
    const store = mockStore(stateFilled);
    renderComponent(product, store, history);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Product.Characteristic)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Product.Description)).toBeInTheDocument();
  });

  it ('should show 1.article by default and by Characteristic click, 2. description when description click', () => {
    const store = mockStore(stateFilled);
    renderComponent(product, store, history);

    expect(screen.getByRole('table')).not.toHaveClass(HIDDEN_CLASS);
    expect(screen.getByText(description)).toHaveClass(HIDDEN_CLASS);

    const descriptionBtn = screen.getByText(ScreenText.Product.Description);
    userEvent.click(descriptionBtn);

    expect(screen.getByText(description)).not.toHaveClass(HIDDEN_CLASS);
    expect(screen.getByRole('table')).toHaveClass(HIDDEN_CLASS);

    const characteristicBtn = screen.getByText(ScreenText.Product.Characteristic);
    userEvent.click(characteristicBtn);

    expect(screen.getByRole('table')).not.toHaveClass(HIDDEN_CLASS);
    expect(screen.getByText(description)).toHaveClass(HIDDEN_CLASS);
  });
});
