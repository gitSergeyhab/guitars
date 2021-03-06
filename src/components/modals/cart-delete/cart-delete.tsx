import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCartGuitars } from '../../../store/cart-reducer/cart-reducer-selectors';
import { Guitar, GuitarWithComments } from '../../../types/types';
import { closePopup, deleteAllTheGuitars, getTruePath, makeStringPrice } from '../../../utils/utils';
import { ESCAPE, GuitarInfo, GuitarType, SELECTOR_MODAL } from '../../../const';
import { setCartGuitars, setGuitarToPopup, setPopupType } from '../../../store/actions';
import { setCartGuitarsToStorage } from '../../../utils/cart-storage-utils';


export default function CartDelete({guitar} : {guitar : Guitar | GuitarWithComments}):JSX.Element {

  const {previewImg, name, price, stringCount,type, vendorCode } = guitar;
  const stringPrice = makeStringPrice(price);


  const {src, srcSet} = getTruePath(previewImg);

  const dispatch = useDispatch();

  const closeCartDelete = () => closePopup(dispatch);


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

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handlePopupOutClick);

    return function cleanup() {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handlePopupOutClick);
    };
  });

  const cartGuitarsOrigin = useSelector(getCartGuitars);


  const handleDeleteBtnClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const cartGuitars = deleteAllTheGuitars(guitar, cartGuitarsOrigin);
    setCartGuitarsToStorage(cartGuitars);
    dispatch(setCartGuitars(cartGuitars));
    dispatch(setGuitarToPopup(null));
    dispatch(setPopupType(null));
  };

  const handleCancelBtnClick = () => closeCartDelete();
  const handleCloseBtnClick = () => closeCartDelete();


  return (
    <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">?????????????? ???????? ???????????</h2>
            <div className="modal__info">
              <img className="modal__img" src={src} srcSet={srcSet} width="67" height="137" alt={name}/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">??????????????: {vendorCode}</p>
                <p className="modal__product-params">{GuitarInfo[type as GuitarType].nameOne}, {stringCount} ????????????????</p>
                <p className="modal__price-wrapper"><span className="modal__price">????????:</span><span className="modal__price">{stringPrice} ???</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                onClick={handleDeleteBtnClick}
                className="button button--small modal__button"
              >
                ?????????????? ??????????
              </button>
              <button
                onClick={handleCancelBtnClick}
                className="button button--black-border button--small modal__button modal__button--right"
              >
                 ???????????????????? ??????????????
              </button>
            </div>
            <button
              onClick={handleCloseBtnClick}
              className="modal__close-btn button-cross" type="button" aria-label="??????????????"
            >
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
