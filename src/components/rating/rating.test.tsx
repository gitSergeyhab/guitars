import { render, screen } from '@testing-library/react';
import { MAX_RATING } from '../../const';
import Rating from './rating';

const TEST_RATING = 4;
const TestId = {
  Star: 'star' ,
  FullStar: 'full-star',
} as const;


describe ('Component Rating', () => {
  it ('should render correctly', () => {
    render(<Rating height='16' rating={TEST_RATING} width='16'/>);

    expect(screen.getAllByTestId(TestId.FullStar).length).toBe(TEST_RATING);
    expect(screen.getAllByTestId(TestId.Star).length).toBe(MAX_RATING - TEST_RATING);
  });
});
