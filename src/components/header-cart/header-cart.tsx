import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { APPRoute } from '../../const';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { getPopupType } from '../../store/popup-reducer/popup-reducer-selectors';

import './header-cart.css';

const CountClass = {
  Default: 'header__cart-count',
  Popup: 'header__cart-count-popup',
};


export default function HeaderCart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);
  const popupType = useSelector(getPopupType);

  const guitarCount = cartGuitars.reduce((acc, item) => acc + item.count , 0);

  const countClass = popupType ? CountClass.Popup : CountClass.Default;

  const indicator = guitarCount ? <span className={countClass}>{guitarCount}</span> : null;

  return (
    <Link className="header__cart-link" to={APPRoute.Cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      {indicator}
    </Link>
  );
}
