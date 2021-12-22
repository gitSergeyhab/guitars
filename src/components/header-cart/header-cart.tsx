import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { APPRoute } from '../../const';


export default function HeaderCart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);

  const guitarCount = cartGuitars.reduce((acc, item) => acc + item.count , 0);

  return (
    <Link className="header__cart-link" to={APPRoute.Cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">{guitarCount}</span>
    </Link>
  );
}
