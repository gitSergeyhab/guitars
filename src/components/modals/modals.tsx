import { useSelector } from 'react-redux';

import CartAdd from './cart-add/cart-add';
import CartDelete from './cart-delete/cart-delete';
import ModalReview from './modal-review/modal-review';
import SuccessReview from './success-review/success-review';
import { getGuitarFromPopup, getPopupType } from '../../store/cart-reducer/cart-reducer-selectors';
import { PopupType } from '../../const';


//!! В Н Е   Т З !!


export default function Modals(): JSX.Element {

  const popupGuitar = useSelector(getGuitarFromPopup);
  const popupType = useSelector(getPopupType);

  const popupAdd = popupGuitar && popupType === PopupType.CartAdd ? <CartAdd guitar={popupGuitar}/> : null;
  const popupDelete = popupGuitar && popupType === PopupType.CartDelete ? <CartDelete guitar={popupGuitar}/> : null;
  const popupReview = popupGuitar && popupType === PopupType.Review ? <ModalReview guitar={popupGuitar}/> : null;
  const popupSuccessReview = popupType === PopupType.SuccessReview ? <SuccessReview /> : null;
  const popupSuccessAdd = popupType === PopupType.SuccessAddToCard ? <SuccessReview /> : null;

  return(
    <>
      {popupAdd}
      {popupDelete}
      {popupReview}
      {popupSuccessReview}
      {popupSuccessAdd}
    </>
  );
}
