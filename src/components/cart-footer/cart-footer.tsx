import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postCoupons, postOrder } from '../../store/api-actions';
import { getCartGuitars, getCoupon, getDiscount } from '../../store/cart-reducer/cart-reducer-selectors';
import { getFullPrice, getOrder, makeStringPrice } from '../../utils/utils';


//!! В Н Е   Т З !!

export default function CartFooter(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);
  const discount = useSelector(getDiscount);

  const fullPrice = getFullPrice(cartGuitars);

  const moneyDiscount = discount / 100 * fullPrice;

  const discountRef = useRef<HTMLInputElement | null>(null);

  const priceWithDiscount = fullPrice  - moneyDiscount;

  const dispatch = useDispatch();
  const coupon = useSelector(getCoupon);

  const handleDiscountBtnClick = () => {
    const value = discountRef.current?.value;
    if (value) {
      dispatch(postCoupons({coupon: value}));
    }
  };

  const handleOrderBtnClick = () => {
    const body = getOrder(cartGuitars, coupon);
    dispatch(postOrder({body}));
  };


  return (
    <div className="cart__footer">
      <div className="cart__coupon coupon">
        <h2 className="title title--little coupon__title">Промокод на скидку</h2>
        <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
        <form className="coupon__form" id="coupon-form" method="post" action="/">
          <div className="form-input coupon__input">
            <label className="visually-hidden">Промокод</label>
            <input
              type="text" placeholder="Введите промокод" id="coupon" name="coupon"
              ref={discountRef}
            />
            <p className="form-input__message form-input__message--success">Промокод принят</p>
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
        <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{makeStringPrice(fullPrice)} ₽</span></p>
        <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- {makeStringPrice(moneyDiscount)} ₽</span></p>
        <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{makeStringPrice(priceWithDiscount)} ₽</span></p>
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
