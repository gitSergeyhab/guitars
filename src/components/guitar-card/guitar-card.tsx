import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../rating/rating';
import { setPopupType, setGuitarToPopup } from '../../store/actions';
import { GuitarWithComments } from '../../types/types';
import { checkGuitarInCart, getRealRating, getTruePath, makeStringPrice } from '../../utils/utils';
import { APPRoute, PopupType } from '../../const';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import styled from 'styled-components';
import { buttonAddToCard, buttonInCard, buttonRed, buttonRedBorder, HiddenSpan, Rate, RateCount, RateMessage } from '../_common/common';


const CardLink = styled(Link)`
  display: block;
  padding: var(--button-vertical-padding) var(--button-horizontal-padding);
  font-family: "Open Sans", "Arial", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  color: #ffffff;
  border: 2px solid #131212;
  border-radius: 2px;
  background-color: #131212;
  cursor: pointer;
  -webkit-transition: background-image 0.3s ease, background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  transition: background-image 0.3s ease, background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  text-align: center;
  letter-spacing: 0.05em;
  --button-horizontal-padding: 18px;
  --button-vertical-padding: 12px;
  font-size: 12px;
  letter-spacing: 0.02em;
  --button-horizontal-padding: 8px;
  --button-vertical-padding: 1px;
  &:hover {
    color: #131212;
    background-color: #ffffff;
  }
`;

const InfoLink = styled(CardLink)`
  ${buttonRedBorder}
  ${buttonInCard}`;

const BuyLink = styled(CardLink)`
  ${buttonRed}
  ${buttonAddToCard}`;


const ProductTitle = styled.p`
  width: 60%;
  margin: 0;
  padding-top: 4px;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: 0.05em;
  text-overflow: ellipsis;`;

const ProductPrice = styled.p`
  width: 40%;
  margin: 0;
  padding-top: 4px;
  text-align: right;`;

const CardBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;`;

const CardButtons = styled(CardBlock)`
  margin-top: auto;
  & a:focus {
    outline: 1px solid #c90606;
    outline-offset: 1px;
  }
  `;

const CardInfo = styled(CardBlock)`
  flex-wrap: wrap;
  margin: 9px 5px 8px 4px;
  `;


const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 220px;
  min-height: 310px;
  padding: 9px 9px 14px;
  font-size: 14px;
  line-height: 15px;
  border: 1px solid #dddada;
  background-color: #ffffff;
  letter-spacing: 0.05em;

  & img {
    width: 100%;
    height: 190px;
    margin: 0 auto;
    -o-object-fit: scale-down;
      object-fit: scale-down;
  }
  `;


const GUITAR_PATH = 'guitars';

export default function GuitarCard({guitar} : {guitar : GuitarWithComments}): JSX.Element {
  const { id, name, previewImg, price, rating, comments } = guitar;

  const realRating = comments.length ? getRealRating(comments) : rating;

  const stringPrice = makeStringPrice(price);
  const cartGuitars = useSelector(getCartGuitars);
  const isGuitarInCart = checkGuitarInCart(cartGuitars, id);

  const { src, srcSet } = getTruePath(previewImg);
  const guitarPath = `${GUITAR_PATH}/${id}`;

  const dispatch = useDispatch();
  const handleBuyClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartAdd));
  };

  return (

    <ProductCardContainer>
      <img src={src} srcSet={srcSet} width="75" height="190" alt="СURT Z30 Plus Acoustics"/>

      <CardInfo>
        <Rate aria-hidden="true">
          <HiddenSpan>Рейтинг:</HiddenSpan>
          <Rating rating={realRating} height='12' width='14'/>
          <RateCount>
            {comments.length}
          </RateCount>
          <RateMessage/>
        </Rate>
        <ProductTitle>{name}</ProductTitle>
        <ProductPrice>
          <HiddenSpan>Цена:</HiddenSpan>{stringPrice} ₽
        </ProductPrice>
      </CardInfo>
      <CardButtons>
        <CardLink to={guitarPath}>Подробнее</CardLink>

        {
          isGuitarInCart
            ?
            <InfoLink to={APPRoute.Cart}>В Корзине</InfoLink>
            :
            <BuyLink
              onClick={handleBuyClick}
              to="/"
            >Купить
            </BuyLink>
        }
      </CardButtons>
    </ProductCardContainer>
  );
}
