
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Filter from './filter';
import { renderComponent } from '../../test-utils/render-util';
import { ScreenText, stateFilled } from '../../test-utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateFilled);

const CHECKBOX_COUNT = 7;


describe ('Component FilterType', () => {
  const filter = <Filter/>;
  it ('should render correctly', () => {
    renderComponent(filter, store, history);


    expect(screen.getByText(ScreenText.Filter.Strings)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Filter.Electric)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox').length).toBe(CHECKBOX_COUNT);
  });
});
