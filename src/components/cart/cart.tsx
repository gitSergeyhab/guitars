import { useSelector } from 'react-redux';

import BreadcrumbCart from '../breadcrumbs/breadcramb-cart/breadcramb-cart';
import BreadcrumbCatalog from '../breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import BreadcrumbMain from '../breadcrumbs/breadcramb-main/breadcramb-main';
import CartFooter from '../cart-footer/cart-footer';
import CartGuitar from '../cart-guitar/cart-guitar';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';

//!! В Н Е   Т З !!


const EMPTY_CART_TEXT = 'Корзина пуста';

export default function Cart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);

  const cardsCartGuitar = cartGuitars.map((item) => <CartGuitar cartGuitar={item} key={item.guitar.id}/>);
  const emptyCart = <div style={{padding: '11% 0 20%'}}><h2>{EMPTY_CART_TEXT}</h2></div>;

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>

        <ul className="breadcrumbs page-content__breadcrumbs">
          <BreadcrumbMain/>
          <BreadcrumbCatalog/>
          <BreadcrumbCart/>
        </ul>

        <div className="cart">

          { cartGuitars.length ? cardsCartGuitar : emptyCart}

          {!!cartGuitars.length && <CartFooter/>}

        </div>
      </div>
    </main>
  );
}
