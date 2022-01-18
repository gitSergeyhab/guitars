import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoupon } from '../../store/actions';

import { postCoupons, postOrder } from '../../store/api-actions';
import { getCartGuitars, getCoupon, getCouponValidStatus, getDiscount } from '../../store/cart-reducer/cart-reducer-selectors';
import { deleteSpaces, getFullPrice, getOrder, makeStringPrice } from '../../utils/utils';


const DISCOUNT_CLASS = 'cart__total-value--bonus';


export default function CartFooter(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);

  const isCouponValid = useSelector(getCouponValidStatus);
  const discount = useSelector(getDiscount);

  const fullPrice = getFullPrice(cartGuitars);

  const moneyDiscount = discount ? Math.round(discount / 100 * fullPrice) : 0;

  const coupon = useSelector(getCoupon);

  const [promoCode, setPromoCode] = useState(coupon || '');

  const priceWithDiscount = fullPrice  - moneyDiscount;

  const dispatch = useDispatch();


  const handleDiscountBtnClick = () => {
    if (promoCode) {
      dispatch(setCoupon(promoCode));
      dispatch(postCoupons({coupon: promoCode}));
    }
  };

  // light-333 , medium-444 , height-555

  const handleOrderBtnClick = () => {
    const body = getOrder(cartGuitars, coupon || '');
    dispatch(postOrder({body}));
  };


  const handlePromoCodeChange = (evt: FormEvent<HTMLInputElement>) => setPromoCode(deleteSpaces(evt.currentTarget.value));

  const promoCodeMessage = isCouponValid ?
    <p className='form-input__message form-input__message--success'>Промокод принят</p> :
    <p className='form-input__message form-input__message--error'>неверный промокод</p>;


  return (
    <div className="cart__footer">
      <div className="cart__coupon coupon">
        <h2 className="title title--little coupon__title">Промокод на скидку</h2>
        <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
        <form className="coupon__form" id="coupon-form" method="post" action="/">
          <div className="form-input coupon__input">
            <label className="visually-hidden">Промокод</label>
            <input
              type="text" id="coupon" name="coupon"
              placeholder='Введите промокод'
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            {isCouponValid !== null ? promoCodeMessage : null}
          </div>

          <button
            type='button'
            onClick={handleDiscountBtnClick}
            className="button button--big coupon__button"
          >
            Применить
          </button>

        </form>
      </div>
      <div className="cart__total-info">
        <p className="cart__total-item">
          <span className="cart__total-value-name">Всего:</span>
          <span className="cart__total-value">{makeStringPrice(fullPrice)} ₽</span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">Скидка:</span>
          <span className={`cart__total-value ${discount ? DISCOUNT_CLASS : ''}`}>
            {discount ? '-' : ''} {makeStringPrice(moneyDiscount)} ₽
          </span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">К оплате:</span>
          <span className="cart__total-value cart__total-value--payment">{makeStringPrice(priceWithDiscount)} ₽</span>
        </p>
        <button
          onClick={handleOrderBtnClick}
          className="button button--red button--big cart__order-button"
        >
           Оформить заказ
        </button>
      </div>
    </div>
  );
}
