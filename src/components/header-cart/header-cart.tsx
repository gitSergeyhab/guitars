import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { APPRoute } from '../../const';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { getPopupType } from '../../store/popup-reducer/popup-reducer-selectors';
import { HiddenSpan } from '../_common/common';

import './header-cart.css';

const CountClass = {
  Default: 'header__cart-count',
  Popup: 'header__cart-count-popup',
};


const CartIcon = styled.svg.attrs({ width: '14', height: '14' })`
top: 50%;
left: 50%;
position: absolute;

width: 14px;
height: 14px;

-webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
`;

const CartLink = styled(Link).attrs({ to: APPRoute.Cart })`
position: relative;
position: relative;

display: block;

width: 14px;
height: 14px;
margin-left: auto;

color: #ffffff;

-webkit-transition: color 0.3s ease;
        transition: color 0.3s ease;

&::before {
  top: 50%;
  left: 50%;
  position: absolute;

  width: 40px;
  height: 40px;

  content: "";
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
&:hover,
&:focus {
  color: #c90606;
}`;

export default function HeaderCart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);
  const popupType = useSelector(getPopupType);

  const guitarCount = cartGuitars.reduce((acc, item) => acc + item.count , 0);

  const countClass = popupType ? CountClass.Popup : CountClass.Default;

  const indicator = guitarCount ? <span className={countClass}>{guitarCount}</span> : null;

  return (
    <CartLink aria-label="Корзина">
      <CartIcon aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </CartIcon>
      <HiddenSpan>Перейти в корзину</HiddenSpan>
      {indicator}
    </CartLink>
  );
}
