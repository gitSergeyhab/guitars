import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Review from '../review/review';
import { getComments, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { PopupType } from '../../const';


// С Л Е Д У Ю Щ И Й   Э Т А П


const REVIEW_COUNT = 3;


function BtnMore({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="button button--medium reviews__more-button"
    >
    Показать еще отзывы
    </button>
  );
}

export function GuitarPageReviews(): JSX.Element {

  const comments = useSelector(getComments);
  const guitar = useSelector(getTheGuitar);
  const [shownReviews, setShownReviews] = useState(REVIEW_COUNT);

  const reviewList = comments.slice(0, shownReviews).map((comment) => <Review review={comment} key={comment.id} />);

  const handleBtnShowMoreClick = () => setShownReviews(Infinity);

  const dispatch = useDispatch();
  const handleBtnPostReviewClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.Review));
  };

  return (

    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        onClick={handleBtnPostReviewClick}
        className="button button--red-border button--big reviews__sumbit-button" href="/"
      >
         Оставить отзыв
      </a>

      {reviewList}
      {(shownReviews === REVIEW_COUNT && comments.length > REVIEW_COUNT)  && <BtnMore onClick={handleBtnShowMoreClick}/>}

      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}
