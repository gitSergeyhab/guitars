import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postComment } from '../../../store/api-actions';
import { Guitar, GuitarWithComments } from '../../../types/types';
import { closePopup } from '../../../utils/utils';
import { ESCAPE, SELECTOR_MODAL } from '../../../const';

import './modal-review.css';


const ZERO_FIELD_VALUE = ' ';

const STARS = [
  {value: 1, name: 'Ужасно'},
  {value: 2, name: 'Плохо'},
  {value: 3, name: 'Нормально'},
  {value: 4, name: 'Хорошо'},
  {value: 5, name: 'Отлично'},
];


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
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>

                  <input
                    ref={userNameRef}
                    className="form-review__input form-review__input--name" id="user-name" data-testid='user-name' type="text" autoComplete="off"
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
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input
                ref={advantageRef}
                className="form-review__input" id="pros" type="text" autoComplete="off"
              />
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input
                ref={disadvantageRef}
                className="form-review__input" id="user-name" type="text" autoComplete="off"
              />
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea
                ref={commentRef}

                className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"
              >
              </textarea>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>


            </form>
            <button
              onClick={handleCloseBtnClick}
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
            >
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
