import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { ScreenText, stateFilled } from '../../test-utils/test-constants';
import { renderComponent } from '../../test-utils/render-util';
import { GuitarPageReviews } from './guitar-page-reviews';
import { DEFAULT_COMMENTS_COUNT } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitarPageReviews = <GuitarPageReviews/>;


describe ('Component GuitarPageReviews', () => {
  it ('should render correctly', () => {
    const store = mockStore(stateFilled);
    renderComponent(guitarPageReviews, store, history);


    expect(screen.getByText(ScreenText.Reviews.Review)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Reviews.BtnMore)).toBeInTheDocument();
    expect(screen.getAllByText(ScreenText.Reviews.Advantage).length).toBe(DEFAULT_COMMENTS_COUNT);
    expect(screen.getAllByText(ScreenText.Reviews.Disadvantage).length).toBe(DEFAULT_COMMENTS_COUNT);
  });

  it ('should render correctly when click btnMore and btnUp', () => {
    const store = mockStore(stateFilled);

    const reviewCount = stateFilled.Guitar.comments.length;
    renderComponent(guitarPageReviews, store, history);

    expect(screen.getAllByText(ScreenText.Reviews.Advantage).length).toBe(DEFAULT_COMMENTS_COUNT);

    const btnMore = screen.getByText(ScreenText.Reviews.BtnMore);
    expect(btnMore).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Reviews.BtnUp)).not.toBeInTheDocument();

    userEvent.click(btnMore);

    expect(screen.getAllByText(ScreenText.Reviews.Advantage).length).toBe(reviewCount);

    expect(screen.queryByText(ScreenText.Reviews.BtnMore)).not.toBeInTheDocument();
    const btnUp = screen.getByText(ScreenText.Reviews.BtnUp);
    expect(btnUp).toBeInTheDocument();

    userEvent.click(btnUp);

    expect(screen.getAllByText(ScreenText.Reviews.Advantage).length).toBe(DEFAULT_COMMENTS_COUNT);

    expect(screen.getByText(ScreenText.Reviews.BtnMore)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Reviews.BtnUp)).not.toBeInTheDocument();

  });
});
