import thunk from 'redux-thunk';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Review from './review';
import { makeFakeComment } from '../../test-utils/test-mocks';
import { renderComponent } from '../../test-utils/render-util';
import { stateEmpty } from '../../test-utils/test-constants';


const TEST_ID = 1;

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateEmpty);

const fakeReview = makeFakeComment(TEST_ID);

const ReviewText = {
  Name: new RegExp(fakeReview.userName, 'i'),
  Advantage: new RegExp(fakeReview.advantage, 'i'),
  Comment: new RegExp(fakeReview.comment, 'i'),
  Disadvantage: new RegExp(fakeReview.disadvantage, 'i'),
};


describe ('Component Review', () => {
  const review = <Review review={fakeReview}/>;
  it ('should render correctly', () => {
    renderComponent(review, store, history);

    expect(screen.getByText(ReviewText.Name)).toBeInTheDocument();
    expect(screen.getByText(ReviewText.Advantage)).toBeInTheDocument();
    expect(screen.getByText(ReviewText.Comment)).toBeInTheDocument();
    expect(screen.getByText(ReviewText.Disadvantage)).toBeInTheDocument();
  });
});

