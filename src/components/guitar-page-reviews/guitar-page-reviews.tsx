import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Review from '../review/review';
import { getComments, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { DEFAULT_COMMENTS_COUNT, PopupType } from '../../const';


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

function BtnUp({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <a
      style={{zIndex: 1}}
      onClick={onClick}
      className="button button--up button--red-border button--big reviews__up-button" href="#header"
    >
      Наверх
    </a>
  );
}

export function GuitarPageReviews(): JSX.Element {

  const comments = useSelector(getComments);
  const guitar = useSelector(getTheGuitar);
  const [shownReviews, setShownReviews] = useState(DEFAULT_COMMENTS_COUNT);

  const reviews = comments.slice(0, shownReviews).map((comment) => <Review review={comment} key={comment.id} />);

  const handleBtnShowMoreClick = () => setShownReviews(Infinity);
  const handleBtnUpClick = () => setShownReviews(DEFAULT_COMMENTS_COUNT);

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

      {reviews}
      {(shownReviews === DEFAULT_COMMENTS_COUNT && comments.length > DEFAULT_COMMENTS_COUNT)  && <BtnMore onClick={handleBtnShowMoreClick}/>}

      {reviews.length > DEFAULT_COMMENTS_COUNT && <BtnUp onClick={handleBtnUpClick}/>}

    </section>
  );
}
