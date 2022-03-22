import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postComment } from '../../../store/api-actions';
import { Guitar, GuitarWithComments } from '../../../types/types';
import { closePopup } from '../../../utils/utils';
import { ESCAPE, SELECTOR_MODAL } from '../../../const';

import './modal-review.css';
import styled, { css } from 'styled-components';
import { ButtonMedium20, DeleteBtn, IconBtn, IconBtnInteractive } from '../../_common/common';


const ZERO_FIELD_VALUE = ' ';

const STARS = [
  {value: 1, name: 'Ужасно'},
  {value: 2, name: 'Плохо'},
  {value: 3, name: 'Нормально'},
  {value: 4, name: 'Хорошо'},
  {value: 5, name: 'Отлично'},
];

const CloseButton = styled.button.attrs({ type: 'button' })`
top: 23px;
right: 23px;
position: absolute;
width: 14px;
height: 14px;
padding: 0;

color: #585757;
border: none;
background-color: transparent;

cursor: pointer;
-webkit-transition: outline-color 0.3s ease;
-webkit-transition: color 0.3s ease;
        transition: outline-color 0.3s ease;
        transition: color 0.3s ease;
&:hover {
  color: #c90606;
}
&:focus {
  color: #c90606;
  outline: none;
}`;


const ReviewLabel = styled.label`
display: inline-block;
margin-bottom: 5px;
font-size: 12px;
line-height: 15px;
color: #585757;
letter-spacing: 0.02em;
`;

const ReviewLabelRequired = styled(ReviewLabel)`
position: relative;
&::before {
  top: -5px;
  right: -10px;
  position: absolute;

  width: 5px;
  height: 5px;

  font-size: 12px;
  line-height: 16px;

  color: #c90606;

  content: "*";
}
`;

const reviewInput = css`
width: 100%;
margin-bottom: 10px;
padding: 5px 8px;
font-size: 14px;
border: 1px solid #585757;
border-radius: 2px;
background-color: inherit;

&::-webkit-input-placeholder {
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  letter-spacing: 0.02em;
}
&::-moz-placeholder {
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  letter-spacing: 0.02em;
}
&:-ms-input-placeholder {
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  letter-spacing: 0.02em;
}
&::-ms-input-placeholder {
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  letter-spacing: 0.02em;
}
&::placeholder {
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  letter-spacing: 0.02em;
}
`;

const Textarea = styled.textarea.attrs({ id: 'user-name', rows: 10, autoComplete: 'off' })`
${reviewInput}
height: 70px;
`;

const ReviewInput = styled.input.attrs({ type: 'text', autoComplete: 'off' })`
${reviewInput}
`;

const ReviewName = styled.input.attrs({ type: 'text', autoComplete: 'off' })`
${reviewInput}
margin-bottom: 0;
`;

const ReviewButton = styled(ButtonMedium20).attrs({ type: 'submit' })`
margin-top: 7px;
margin-right: 70px;
margin-left: 70px;`;


type ReviewStarType = {score: {value: number, name: string}, onChange: () => void,  onMouseEnter: () => void, onMouseLeave: () => void, focusedStar: number, checkedStar: number}


function ReviewStar({score, onMouseEnter, onMouseLeave, onChange, focusedStar, checkedStar}: ReviewStarType): JSX.Element {

  const id = `star-${score.value}`;

  const isStarFilled = focusedStar >= score.value || (!focusedStar && checkedStar >= score.value);

  const usedStarHref = isStarFilled ? <use xlinkHref="#icon-full-star"></use> : <use xlinkHref="#icon-star"></use>;


  return (
    <>
      <input
        onChange={onChange}
        onFocus={onChange}
        className="visually-hidden" type="radio" id={id} name="rate" value={score.value}
      />
      <label htmlFor={id} title={score.name}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >

        <svg width={20} height={20} aria-hidden="true">
          {usedStarHref}
        </svg>
      </label>
    </>
  );
}


export default function ModalReview({guitar} : {guitar : Guitar | GuitarWithComments}): JSX.Element {

  const {name, id } = guitar;

  const dispatch = useDispatch();
  const closeCartDelete = () => closePopup(dispatch);


  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handlePopupOutClick);

    return function cleanup() {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handlePopupOutClick);
    };
  });


  const handleCloseBtnClick = () => closeCartDelete();

  const [userName, setUserName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorStar, setErrorStar] = useState(false);
  const [focusedStar, setStarFocused] = useState(0);
  const [checkedStar, setStarChecked] = useState(0);


  const handleNameInput = (evt: React.FormEvent<HTMLInputElement>) => {
    setUserName(evt.currentTarget.value);
    setErrorName(false);
  };


  const handleStarChange = (star: number) => {
    setStarChecked(star);
    setErrorStar(false);
  };


  const stars = STARS.map((star) => (
    <ReviewStar score={star} key={star.value} focusedStar={focusedStar} checkedStar={checkedStar} onMouseEnter={() => setStarFocused(star.value)} onChange={() => handleStarChange(star.value)} onMouseLeave={() => setStarFocused(0)}/>),
  );


  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const advantage = advantageRef.current?.value || ZERO_FIELD_VALUE;
    const disadvantage = disadvantageRef.current?.value || ZERO_FIELD_VALUE;
    const comment = commentRef.current?.value || ZERO_FIELD_VALUE;

    setErrorStar(!checkedStar);
    setErrorName(!userName.trim());

    if (checkedStar && userName.trim()) {
      const body = {guitarId: id, rating: checkedStar, userName, advantage, disadvantage, comment};
      dispatch(postComment({body}));
    }
  };

  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === ESCAPE) {
      closeCartDelete();
    }
  };

  const handlePopupOutClick = (evt: MouseEvent) => {
    if (evt.target instanceof Element && !evt.target.closest(SELECTOR_MODAL)) {
      closeCartDelete();
    }
  };


  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
            <form className="form-review" onSubmit={handleFormSubmit}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <ReviewLabelRequired htmlFor="user-name">Ваше Имя</ReviewLabelRequired>

                  <ReviewName
                    ref={userNameRef}
                    id="user-name" data-testid='user-name'
                    value={userName}
                    onChange={handleNameInput}
                  />
                  <span className="form-review__warning">
                    {errorName ? 'Заполните поле' : <br/>}
                  </span>

                </div>
                <div><span className="form-review__label form-review__label--required" style={{marginBottom: '10px'}}>Ваша Оценка</span>
                  <div className='rect-rate'>
                    {stars}

                    <span className="rate__count"></span>
                    {errorStar && <span className="rate__message" style={{marginLeft: '-3px'}} >Поставьте оценку</span>}

                  </div>
                </div>

              </div>
              <ReviewLabel htmlFor="user-name">Достоинства</ReviewLabel>
              <ReviewInput
                ref={advantageRef}
                id="pros"
              />
              <ReviewLabel htmlFor="user-name">Недостатки</ReviewLabel>
              <ReviewInput
                ref={disadvantageRef}
                id="user-name"
              />
              <ReviewLabel htmlFor="user-name">Комментарий</ReviewLabel>
              <Textarea ref={commentRef} />
              <ReviewButton >Отправить отзыв</ReviewButton>


            </form>
            <CloseButton
              onClick={handleCloseBtnClick}
              aria-label="Закрыть"
            >
              <IconBtn/>
              <IconBtnInteractive/>
            </CloseButton>
          </div>
        </div>
      </div>
    </div>
  );
}


