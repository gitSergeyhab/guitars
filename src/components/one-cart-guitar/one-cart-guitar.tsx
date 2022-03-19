import { FormEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPopupType, setGuitarToPopup, setCartGuitars } from '../../store/actions';
import { CartGuitar } from '../../types/types';
import { addGuitar, deleteGuitar, getTruePath, makeStringPrice, setCountTheGuitars } from '../../utils/utils';
import { PopupType } from '../../const';
import { getCartGuitars } from '../../store/cart-reducer/cart-reducer-selectors';
import { setCartGuitarsToStorage } from '../../utils/cart-storage-utils';
import styled from 'styled-components';


const DeleteBtn = styled.button.attrs({ type: 'button' })`
  position: relative;
  grid-area: button;
  width: 14px;
  height: 14px;
  padding: 0;
  color: #585757;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: outline-color 0.3s ease;
  transition: color 0.3s ease;
  &:hover {
    color: #c90606;
  }
  &:focus {
    color: #c90606;
    outline: none;
  }
`;

const IconBtn = styled.span`
  &::before,
  &::after {
    top: 6.5px;
    left: -1.5px;
    position: absolute;
    width: 17px;
    height: 1px;
    background-color: currentColor;
    content: "";
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }`;

const IconBtnInteractive = styled.span`
  position: relative;
  ::before {
  top: 50%;
  left: 50%;
  position: absolute;

  width: 50px;
  height: 50px;

  content: "";
  transform: translate(-50%, -50%);
}`;

// const DeleteBtn = <DeleteBtnStyle><IconBtn/><IconBtnInteractive/></DeleteBtnStyle>;


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

      <div className="product-info cart-item__info">
        <ProductTitle>{name}</ProductTitle>
        <ProductInfo>Артикул: {vendorCode}</ProductInfo>
        <ProductInfo>{type}, {stringCount} струнная</ProductInfo>
      </div>
      <div className="cart-item__price">{stringPrice} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button" aria-label="Уменьшить количество"
          onClick={handleMinusClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          onChange={handleGuitarCountChange}
          value={`${count}`}
          className="quantity__input" type="number" id="4-count" name="4-count" max="99"
        />

        <button
          className="quantity__button" aria-label="Увеличить количество"
          onClick={handlePluseClick}

        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{makeStringPrice(price * count)} ₽</div>
    </div>
  );
}
