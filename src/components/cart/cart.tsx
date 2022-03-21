import { useSelector } from 'react-redux';

import CartFooter from '../cart-footer/cart-footer';
import OneCartGuitar from '../one-cart-guitar/one-cart-guitar';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { APPRoute, EMPTY_CART_TEXT } from '../../const';
import styled from 'styled-components';
import Breadcrumb from '../breadcrumbs/breadcrumb';
import { BreadcrumbsList, Main, PageContainer, TitleBiggerPC } from '../_common/common';


export const TEST_CART_ID = 'TEST_CART_ID';


const CartContainer = styled.div`
  padding-top: 2px;
  padding-bottom: 3px;`;


export default function Cart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);

  const cardsCartGuitar = cartGuitars.map((item) => <OneCartGuitar cartGuitar={item} key={item.guitar.id}/>);
  const emptyCart = <div style={{padding: '11% 0 20%'}}><h2>{EMPTY_CART_TEXT}</h2></div>;

  return (
    <Main>
      <PageContainer>
        <TitleBiggerPC>Корзина</TitleBiggerPC>

        <BreadcrumbsList>
          <Breadcrumb type={APPRoute.Main}/>
          <Breadcrumb type={APPRoute.Catalog}/>
          <Breadcrumb type={APPRoute.Cart}/>
        </BreadcrumbsList>


        <CartContainer data-testid={TEST_CART_ID}>

          { cartGuitars.length ? cardsCartGuitar : emptyCart}

          {!!cartGuitars.length && <CartFooter/>}

        </CartContainer>
      </PageContainer>
    </Main>
  );
}
