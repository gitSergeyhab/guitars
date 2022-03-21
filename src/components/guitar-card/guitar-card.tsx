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
import { buttonAddToCard, buttonInCard, buttonRed, buttonRedBorder, visuallyHidden } from '../_common/common';

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

const HiddenSpan = styled.span`${visuallyHidden}`;

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

const RateCount = styled.span`
margin-right: auto;
color: #585757;`;

const RateMessage = styled.span`
bottom: -17px;
left: 7px;
position: absolute;
width: 100px;
margin: 0;
font-size: 10px;
font-weight: normal;
font-style: normal;
line-height: 15px;
color: #eb5555;
letter-spacing: 0.02em;`;

const Rate = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: flex-start;
width: 100%;
color: #c90606;
& svg {
  margin-right: 3px;
}
& label {
  position: relative;
}
&:not(:checked) > label {
  float: right;
  overflow: hidden;
  width: 18px;
  height: 20px;
  font-size: 30px;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}
&:not(:checked) > label::before {
  position: absolute;
  width: 24px;
  height: 20px;
  background: url("../img/sprite/icon-star.svg") no-repeat top 0 left 0;
  background-size: 18px 20px;
  content: "";
  &  > input:checked ~ label {
    background: url("../img/sprite/icon-full-star.svg") no-repeat top 0 left 0;
    background-size: 18px 20px;
  }
  &:not(:checked) > label:hover,
  &:not(:checked) > label:hover ~ label {
    background: url("../img/sprite/icon-full-star.svg") no-repeat top 0 left 0;
    background-size: 18px 20px;
  }
  & > input:focus + label {
    outline: 1px solid #000000;
    outline-offset: -1px;
  }
}
align-items: flex-start;

width: 100%;
margin: 2px 0 0 0;

font-size: 10px;
line-height: 15px;

color: #585757;

letter-spacing: 0.1em;
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
  const {id, name, previewImg, price, rating, comments} = guitar;

  const realRating = comments.length ? getRealRating(comments) : rating;

  const stringPrice = makeStringPrice(price);
  const cartGuitars = useSelector(getCartGuitars);
  const isGuitarInCart = checkGuitarInCart(cartGuitars, id);

  const {src, srcSet} = getTruePath(previewImg);
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
        <Rate aria-hidden="true"><HiddenSpan>Рейтинг:</HiddenSpan>
          <Rating rating={realRating} height='12' width='14'/>
          <RateCount>
            {comments.length}
          </RateCount>
          <RateMessage></RateMessage>
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
