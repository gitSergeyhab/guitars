import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Review from '../review/review';
import { getComments, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { DEFAULT_COMMENTS_COUNT, PopupType } from '../../const';
import styled from 'styled-components';
import { buttonCss, ButtonMedium, buttonRedBorder, buttonUp, titleBigger } from '../_common/common';


const ButtonMore = styled(ButtonMedium)`
  bottom: 0;
  position: relative;
  min-width: 300px;
  margin: 0 auto;
  `;

const ButtonUp = styled.a.attrs({ href: '#header' })`
  ${buttonCss}
  ${buttonRedBorder}
  ${buttonUp}
  font-size: 16px;
  --button-horizontal-padding: 20px;
  right: 0;
  bottom: -51px;
  position: absolute;
  z-index: 1;
  `;

const ButtonReview = styled.a.attrs({ href: '#header' })`
  ${buttonCss}
  ${buttonRedBorder}
    font-size: 16px;
    --button-horizontal-padding: 20px;
    top: 46px;
    right: 0;
    position: absolute;
  `;


const ReviewTitle = styled.h3`
  ${titleBigger}
  margin-top: 0;
  margin-bottom: 34px;
  font-weight: bold;
  color: #010101;
  `;

const ReviewSection = styled.section`
position: relative;
padding-top: 48px;`;

function BtnMore({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <ButtonMore onClick={onClick}>
      Показать еще отзывы
    </ButtonMore>
  );
}

function BtnUp({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <ButtonUp onClick={onClick}>
      Наверх
    </ButtonUp>
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

    <ReviewSection>
      <ReviewTitle>Отзывы</ReviewTitle>
      <ButtonReview onClick={handleBtnPostReviewClick}>
         Оставить отзыв
      </ButtonReview>

      {reviews}

      {(shownReviews === DEFAULT_COMMENTS_COUNT && comments.length > DEFAULT_COMMENTS_COUNT)  && <BtnMore onClick={handleBtnShowMoreClick}/>}

      {reviews.length > DEFAULT_COMMENTS_COUNT && <BtnUp onClick={handleBtnUpClick}/>}

    </ReviewSection>
  );
}
