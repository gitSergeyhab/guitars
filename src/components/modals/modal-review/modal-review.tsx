import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ESCAPE, SELECTOR_MODAL } from '../../../const';
import { setGuitarToPopup, setPopupType } from '../../../store/actions';
import { postComment } from '../../../store/api-actions';
import { Guitar, GuitarWithComments } from '../../../types/types';


// С Л Е Д У Ю Щ И Й   Э Т А П


const STARS = [
  {value: 5, name: 'Отлично'},
  {value: 4, name: 'Хорошо'},
  {value: 3, name: 'Нормально'},
  {value: 2, name: 'Плохо'},
  {value: 1, name: 'Ужасно'},
];


function ReviewStar({score, onChange}: {score: {value: number, name: string}, onChange: () => void}): JSX.Element {

  const id = `star-${score.value}`;

  return (
    <>
      <input
        onChange={onChange}
        className="visually-hidden" type="radio" id={id} name="rate" value={score.value}
      />
      <label className="rate__label" htmlFor={id} title={score.name}></label>
    </>
  );
}


export default function ModalReview({guitar} : {guitar : Guitar | GuitarWithComments}): JSX.Element {

  const {name, id } = guitar;

  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(setGuitarToPopup(null));
    dispatch(setPopupType(null));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handlePopupOutClick);

    return function cleanup() {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handlePopupOutClick);
    };
  });


  const handleCloseBtnClick = () => closePopup();

  const [rating, setRating] = useState(0);

  const stars = STARS.map((star) => <ReviewStar score={star} key={star.value} onChange={() => setRating(star.value)}/>);

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const userName = userNameRef.current?.value;
    const advantage = advantageRef.current?.value;
    const disadvantage = disadvantageRef.current?.value;
    const comment = commentRef.current?.value;

    if (rating && userName && advantage && disadvantage && comment ) {
      const body = {guitarId: id, ratting: rating, userName, advantage, disadvantage, comment};
      dispatch(postComment({body}));
    }
  };

  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === ESCAPE) {
      closePopup();
    }
  };

  const handlePopupOutClick = (evt: MouseEvent) => { // MouseEvent не из Реакт!
    if (evt.target instanceof Element && !evt.target.closest(SELECTOR_MODAL)) {
      closePopup();
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
                    className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off"
                  />

                  <span className="form-review__warning">Заполните поле</span>
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">

                    {stars}

                    <span className="rate__count"></span>
                    <span className="rate__message">Поставьте оценку</span>
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
