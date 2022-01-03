import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ESCAPE, SELECTOR_MODAL } from '../../../const';
import { setGuitarToPopup, setPopupType } from '../../../store/actions';


// С Л Е Д У Ю Щ И Й   Э Т А П


export default function SuccessReview(): JSX.Element {

  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(setGuitarToPopup(null));
    dispatch(setPopupType(null));
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

  const handleCancelBtnClick = () => closePopup();
  const handleCloseBtnClick = () => closePopup();


  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handlePopupOutClick);

    return function cleanup() {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handlePopupOutClick);
    };
  });

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                onClick={handleCancelBtnClick}
                className="button button--small modal__button modal__button--review"
              >К покупкам!
              </button>
            </div>
            <button
              onClick={handleCloseBtnClick}
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
            ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
