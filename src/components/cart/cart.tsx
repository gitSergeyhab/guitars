import { useSelector } from 'react-redux';

import BreadcrumbCart from '../breadcrumbs/breadcramb-cart/breadcramb-cart';
import BreadcrumbCatalog from '../breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import BreadcrumbMain from '../breadcrumbs/breadcramb-main/breadcramb-main';
import CartFooter from '../cart-footer/cart-footer';
import OneCartGuitar from '../one-cart-guitar/one-cart-guitar';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { EMPTY_CART_TEXT } from '../../const';
import styled from 'styled-components';


export const TEST_CART_ID = 'TEST_CART_ID';


const BreadcrumbsList = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;

  list-style: none;

  font-size: 14px;
  line-height: 19px;
  margin: 20px 0 43px;

`;


const Title = styled.h1`
  padding: 0;

  font-family: "Open Sans", "Arial", sans-serif;
  font-weight: 700;
  line-height: 1.2;

  color: inherit;
`;

const TitleBigger = styled(Title)`
  font-size: 22px;
  line-height: 30px;
`;

const TitleBiggerPC = styled(TitleBigger)`
  margin-top: 0;
  margin-bottom: 0;
`;

const CartContainer = styled.div`
  padding-top: 2px;
  padding-bottom: 3px;`;


const PageContainer = styled.div`
  width: 100%;
  min-width: 1020px;
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 40px;
`;

const Main = styled.main`
  position: relative;
  padding: 215px 0 139px;

  &::before, &::after {
    position: absolute;
    width: 100%;
    content: "";
  }
  &::before {
    top: 0;

    height: 251px;

    background-image: url("../img/content/bg_header.png"), url("data:image/svg+xml,%3Csvg width='1020' height='74' viewBox='0 0 1020 74' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='28' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='56' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='14' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='42' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='70' width='1020' height='4' fill='%233F3F3F'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat, repeat-x;
    background-position: top -38px right, top 24px center;
    background-size: 825px, 1020px;
  }
  &::after {
    bottom: 0;
    height: 139px;
    background-image: url("data:image/svg+xml,%3Csvg width='1020' height='5' viewBox='0 0 1020 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1020' height='5' fill='%23131212'/%3E%3C/svg%3E%0A"), url("../img/content/bg_header.png");
    background-repeat: repeat-x, no-repeat;
    background-position: bottom 129px center, bottom -31% left 103%;
    background-size: 1020px, 825px;
    transform: rotate(180deg);
  }
`;

export default function Cart(): JSX.Element {

  const cartGuitars = useSelector(getCartGuitars);


  const cardsCartGuitar = cartGuitars.map((item) => <OneCartGuitar cartGuitar={item} key={item.guitar.id}/>);
  const emptyCart = <div style={{padding: '11% 0 20%'}}><h2>{EMPTY_CART_TEXT}</h2></div>;

  return (
    <Main>
      <PageContainer>
        <TitleBiggerPC>Корзина</TitleBiggerPC>

        <BreadcrumbsList>
          <BreadcrumbMain/>
          <BreadcrumbCatalog/>
          <BreadcrumbCart/>
        </BreadcrumbsList>


        <CartContainer data-testid={TEST_CART_ID}>

          { cartGuitars.length ? cardsCartGuitar : emptyCart}

          {!!cartGuitars.length && <CartFooter/>}

        </CartContainer>
      </PageContainer>
    </Main>
  );
}
