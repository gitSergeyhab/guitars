import { FormEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPopupType, setGuitarToPopup, setCartGuitars } from '../../store/actions';
import { CartGuitar } from '../../types/types';
import { addGuitar, deleteGuitar, getTruePath, makeStringPrice, setCountTheGuitars } from '../../utils/utils';
import { PopupType } from '../../const';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { setCartGuitarsToStorage } from '../../utils/cart-storage-utils';
import styled from 'styled-components';
import { DeleteBtn, IconBtn, IconBtnInteractive } from '../_common/common';


const CartImg = styled.img.attrs({ width: 55, height: 130 })``;
const CartImage = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  width: 100%;
  height: 130px;
  margin: 0 auto;

  grid-area: photo;
  -o-object-fit: contain;
    object-fit: contain;
`;

const ProductTitle = styled.p`
  margin: 0 0 15px 0;
  padding: 0;

  font-size: 16px;
  font-weight: 700;
  line-height: 15px;

  letter-spacing: 0.05em;
  text-transform: uppercase;`;


const ProductInfo = styled.p`
  margin: 0 0 5px 0;

  font-size: 14px;
  line-height: 15px;

  letter-spacing: 0.05em;
`;

const QuantityInput = styled.input.attrs({ type: 'number', id:'4-count', name: '4-count', max: '99' })`
display: flex;
width: 28px;
height: 100%;
padding: 0;
font-size: 16px;
line-height: 30px;
border: none;
border-right: 1px solid #585757;
border-left: 1px solid #585757;
background-color: transparent;
-webkit-transition: color 0.3s ease, outline-color 0.3s ease;
        transition: color 0.3s ease, outline-color 0.3s ease;
text-align: center;
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
          appearance: none;
}
&:hover,
&:focus {
  border: none;
  outline: 1px solid #c90606;
}`;

const QuantityButton = styled.button.attrs({ type: 'button' })`
position: relative;
display: flex;
align-items: center;
justify-content: center;
width: 25px;
height: 100%;
padding: 0;
font-size: 20px;
color: #585757;
border: none;
background: transparent;
cursor: pointer;
-webkit-transition: color 0.3s ease, outline-color 0.3s ease;
        transition: color 0.3s ease, outline-color 0.3s ease;
&:hover,
&:focus {
  color: #c90606;
  outline: none;
}
`;

const TotalPrice = styled.div`
  margin-top: 46px;
  margin-left: auto;

  font-size: 20px;
  font-weight: 700;

  text-align: end;
  letter-spacing: 0.05em;

  grid-area: total-price;
  `;

const QuantityWrapper = styled.div`
  display: flex;
  align-content: stretch;
  align-items: stretch;
  justify-content: center;
  height: 30px;
  border: 1px solid #585757;
  margin-top: 40px;
  margin-left: auto;
  grid-area: quantity;`;

const PriceOne = styled.div`
  margin-top: 46px;
  margin-left: auto;
  font-size: 20px;
  letter-spacing: 0.05em;
  grid-area: price;
  `;

const CartInfo = styled.div`
  margin: 26px 0 39px 20px;
  grid-area: info;`;

export default function OneCartGuitar({cartGuitar} : {cartGuitar: CartGuitar}): JSX.Element {

  const {guitar, count} = cartGuitar;
  const {name, stringCount, type, vendorCode, price, previewImg} = guitar;
  const {src, srcSet} = getTruePath(previewImg);

  const stringPrice = makeStringPrice(price);

  const cartGuitarsOrigin = useSelector(getCartGuitars);

  const dispatch = useDispatch();

  const handlePluseClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    addGuitar(cartGuitarsOrigin, dispatch, guitar);
  };

  const handleMinusClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (count <= 1) {
      dispatch(setGuitarToPopup(guitar));
      dispatch(setPopupType(PopupType.CartDelete));
    } else {
      deleteGuitar(cartGuitarsOrigin, dispatch, guitar);
    }
  };


  const handleDeleteAllTheGuitars = () => {
    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartDelete));
  };


  const handleGuitarCountChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const cartGuitars = setCountTheGuitars(guitar, cartGuitarsOrigin, +value);

    setCartGuitarsToStorage(cartGuitars);
    dispatch(setCartGuitars(cartGuitars));
  };


  return (
    <div className="cart-item">
      <DeleteBtn
        onClick={handleDeleteAllTheGuitars}
        taria-label="Удалить"
      >
        <IconBtn/>
        <IconBtnInteractive/>
      </DeleteBtn>

      <CartImage>
        <CartImg src={src} srcSet={srcSet} alt={name}/>
      </CartImage>

      <CartInfo>
        <ProductTitle>{name}</ProductTitle>
        <ProductInfo>Артикул: {vendorCode}</ProductInfo>
        <ProductInfo>{type}, {stringCount} струнная</ProductInfo>
      </CartInfo>
      <PriceOne>{stringPrice} ₽</PriceOne>
      <QuantityWrapper>
        <QuantityButton
          aria-label="Уменьшить количество"
          onClick={handleMinusClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </QuantityButton>
        <QuantityInput
          onChange={handleGuitarCountChange}
          value={`${count}`}
        />

        <QuantityButton
          aria-label="Увеличить количество"
          onClick={handlePluseClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </QuantityButton>
      </QuantityWrapper>
      <TotalPrice>{makeStringPrice(price * count)} ₽</TotalPrice>
    </div>
  );
}


