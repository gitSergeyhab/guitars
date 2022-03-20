import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, {css} from 'styled-components';
import { setCoupon } from '../../store/actions';

import { postCoupons, postOrder } from '../../store/api-actions';
import { getCartGuitars, getCoupon, getCouponValidStatus, getDiscount } from '../../store/cart-reducer/cart-reducer-selectors';
import { deleteSpaces, getFullPrice, getOrder, makeStringPrice } from '../../utils/utils';
import { ButtonBig, buttonRed, FormInputContainer, HiddenLabel, titleLittle } from '../_common/common';


//!!


const FormMessage = styled.p`
  margin: 4px 2px 0 0;
  font-size: 10px;
  line-height: 15px;
  text-align: right;
  letter-spacing: 0.05em;
  text-align: center;
`;


const CouponInput = styled(FormInputContainer)`
  width: 180px;
  & input {
    flex: 0 0 0;

    width: 100%;
    height: 40px;
    padding-right: 9px;

    font-size: 14px;
    line-height: 15px;

    color: #000000;
    border: 2px solid #dddada;
    border-radius: 2px;

    -webkit-transition: border-color 0.3s ease;
            transition: border-color 0.3s ease;
    text-align: center;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  & input::-webkit-input-placeholder {
    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 12px;
    line-height: 15px;

    -webkit-transform: translate3d(0, -2px, 0);
            transform: translate3d(0, -2px, 0);
    letter-spacing: 0.05em;
    text-transform: none;
  }

  input::-moz-placeholder {
    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 12px;
    line-height: 15px;

    transform: translate3d(0, -2px, 0);
    letter-spacing: 0.05em;
    text-transform: none;
  }

  & input:-ms-input-placeholder {
    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 12px;
    line-height: 15px;

    transform: translate3d(0, -2px, 0);
    letter-spacing: 0.05em;
    text-transform: none;
  }

  & input::-ms-input-placeholder {
    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 12px;
    line-height: 15px;

    transform: translate3d(0, -2px, 0);
    letter-spacing: 0.05em;
    text-transform: none;
  }

  & input::placeholder {
    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 12px;
    line-height: 15px;

    -webkit-transform: translate3d(0, -2px, 0);
            transform: translate3d(0, -2px, 0);
    letter-spacing: 0.05em;
    text-transform: none;
  }

  & input:hover {
    border-color: #545454;
  }
`;


const CouponForm = styled.form
  .attrs({ id: 'coupon-form', method: 'post', action: '/' })`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  `;

const CouponInfo = styled.p`
  width: 100%;
  margin: 0 0 20px;

  font-size: 14px;
  line-height: 15px;

  color: #000000;

  letter-spacing: 0.05em;
`;


const CouponTitle = styled.h2`
  ${titleLittle};
  width: 100%;
  margin: 4px 0 9px;
  padding: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
`;


const TotalValue = styled.span`
  margin: 0 0 0 20px;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.05em;
  ${({$isBonus = false} : {$isBonus?: boolean}) => $isBonus && css`color: #c90606;`}
`;

const TotalValuePayment = styled(TotalValue)`font-weight: 700;`;

const TotalValueName = styled.span`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.05em;`;

const TotalItem = styled.p`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  margin: 0 0 11px 0;
  padding: 0;`;

const TotalInfo = styled.div`
display: flex;
align-items: flex-end;
flex-direction: column;
justify-content: space-between;

min-width: 220px;`;

const OrderButton = styled(ButtonBig).attrs({ type: 'button' })`
  ${buttonRed}
  align-self: flex-end;
  width: 100%;
  margin-top: 15px;
  letter-spacing: 0.05em;`;

const CouponButton = styled(ButtonBig).attrs({ type: 'submit' })`
  min-width: 180px;
  padding-top: 8px;
  padding-bottom: 8px;

  border-radius: 0 2px 2px 0;

  letter-spacing: 0.05em;`;

const CouponContainer = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  `;

const CartFooterDiv = styled.div`
  display: flex;
  align-content: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 26px;
  `;

const SuccessFormMessage = styled(FormMessage)`color: #07742c;`;
const ErrorFormMessage = styled(FormMessage)`color: #eb5555;`;


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


  const handleDiscountBtnClick = (evt: FormEvent) => {
    evt.preventDefault();
    if (promoCode) {
      dispatch(setCoupon(promoCode));
      dispatch(postCoupons({coupon: promoCode}));
    }
  };


  const handleOrderBtnClick = () => {
    const body = getOrder(cartGuitars, coupon || '');
    dispatch(postOrder({body}));
  };


  const handlePromoCodeChange = (evt: FormEvent<HTMLInputElement>) => setPromoCode(deleteSpaces(evt.currentTarget.value));

  const promoCodeMessage = isCouponValid ?
    <SuccessFormMessage>Промокод принят</SuccessFormMessage> :
    <ErrorFormMessage>неверный промокод</ErrorFormMessage>;


  return (
    <CartFooterDiv>
      <CouponContainer>
        <CouponTitle>Промокод на скидку</CouponTitle>
        <CouponInfo>Введите свой промокод, если он у вас есть.</CouponInfo>
        <CouponForm onSubmit={handleDiscountBtnClick}>
          <CouponInput>
            <HiddenLabel>Промокод</HiddenLabel>
            <input
              type="text" id="coupon" name="coupon"
              placeholder='Введите промокод'
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            {isCouponValid !== null ? promoCodeMessage : null}
          </CouponInput>

          <CouponButton>Применить</CouponButton>

        </CouponForm>
      </CouponContainer>
      <TotalInfo>
        <TotalItem>
          <TotalValueName>Всего:</TotalValueName>
          <TotalValue>{makeStringPrice(fullPrice)} ₽</TotalValue>
        </TotalItem>
        <TotalItem>
          <TotalValueName>Скидка:</TotalValueName>
          <TotalValue $isBonus={!!discount}>
            {discount && moneyDiscount ? '-' : ''} {makeStringPrice(moneyDiscount)} ₽
          </TotalValue>
        </TotalItem>
        <TotalItem>
          <TotalValueName>К оплате:</TotalValueName>
          <TotalValuePayment>{makeStringPrice(priceWithDiscount)} ₽</TotalValuePayment>
        </TotalItem>
        <OrderButton onClick={handleOrderBtnClick}>
           Оформить заказ
        </OrderButton>
      </TotalInfo>
    </CartFooterDiv>
  );
}
