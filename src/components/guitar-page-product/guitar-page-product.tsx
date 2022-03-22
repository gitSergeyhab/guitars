import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../rating/rating';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { Guitar } from '../../types/types';
import { getRealRating, getTruePath, makeStringPrice } from '../../utils/utils';
import { GuitarInfo, GuitarType,  PopupType } from '../../const';
import { getComments } from '../../store/guitar-reducer/guitar-reducer-selectors';
import styled, { css } from 'styled-components';
import { ButtonBig, buttonBlackBorder, ButtonMedium, buttonRed, HiddenSpan, RateCount, RateMessage, Rate, titleBig, titleUpper } from '../_common/common';


const enum Option {
  Characteristic = 'Characteristic',
  Description = 'Description',
}


const TabTitle = styled.td`
  max-width: 160px;
  padding: 0;
  font-weight: 600;
  text-align: left;
  `;

const TabValue = styled.td`
  max-width: 160px;
  margin-left: auto;
  text-align: end;`;

const TabRow = styled.tr`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
  `;

const Table = styled.table`
  width: inherit;
  padding-top: 21px;
  border-spacing: 0;
  ${({ $isHidden } : { $isHidden: boolean }) => $isHidden ? css`display: none` : '' }`;

const Description = styled.p`
  margin: 0;
  padding-top: 20px;
  ${({ $isHidden } : { $isHidden: boolean }) => $isHidden ? css`display: none` : '' }`;

const TabButton = styled(ButtonMedium).attrs({ type: 'button' })`
  min-width: 190px;
  padding-right: 26px;
  padding-left: 26px;
  ${({ $isActive } : { $isActive: boolean }) => $isActive ? buttonBlackBorder : '' }`;

const TabsContent = styled.div.attrs({ id: 'characteristics' })`width: 100%;`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;`;

const ButtonAddToCart = styled(ButtonBig)`
  ${buttonRed}
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  `;

const ProductText = styled.p`
  margin-top: 0;
  margin-bottom: 34px;
  font-size: 20px;
  line-height: 15px;
  letter-spacing: 0.05em;
  `;

const ProductTitle = styled(ProductText)`padding-left: 5px;`;

const ProductValue = styled(ProductText)`
  margin-left: auto;
  padding-right: 6px;
  font-weight: bold;
  `;

const ProductWrapper = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 246px;
  height: 165px;
  margin-top: 13px;
  margin-left: auto;
  padding-top: 30px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  border: 1px solid rgba(88, 87, 87, 0.7);
  border-radius: 2px;
  `;


const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 8px;
  ${titleBig}
  ${titleUpper}
  `;

const ProductInfoWrapper = styled.div`width: 380px;`;

const ProductImg = styled.img.attrs({ width:'90', height: '235' })`
  width: 220px;
  height: 252px;
  margin-right: 20px;
  -o-object-fit: contain;
    object-fit: contain;`;

const ProductContainer = styled.div`
  display: flex;
  padding-bottom: 62px;
  font-size: 14px;
  line-height: 15px;
  border-bottom: 0.7px solid #dddada;
  letter-spacing: 0.05em;
  `;

type TabBlockProps = { title: string, value: string };

function TabBlock({ title, value } : TabBlockProps) {
  return (
    <TabRow>
      <TabTitle>{ title }</TabTitle>
      <TabValue>{ value }</TabValue>
    </TabRow>
  );
}


export default function GuitarPageProduct({guitar} : {guitar : Guitar}): JSX.Element{

  const dispatch = useDispatch();
  const comments = useSelector(getComments);
  const [option, setOption] = useState(Option.Characteristic);
  const {name, previewImg, price, stringCount, type, vendorCode, rating, description} = guitar;

  const stringPrice = makeStringPrice(price);
  const realRating = comments.length ? getRealRating(comments) : rating;

  const rusType = GuitarInfo[type as GuitarType].nameOne;

  const {src, srcSet} = getTruePath(previewImg);

  const handleCharacteristicClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setOption(Option.Characteristic);
  };

  const handleDescriptionClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setOption(Option.Description);
  };

  const handleBuyClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartAdd));
  };

  return (
    <ProductContainer>
      <ProductImg src={src} srcSet={srcSet} alt={name}/>
      <ProductInfoWrapper>
        <Title>{name}</Title>
        <Rate aria-hidden="true">
          <HiddenSpan>Рейтинг:</HiddenSpan>

          <Rating rating={realRating} height='14' width='14'/>

          <RateCount>{comments.length}</RateCount>
          <RateMessage/>
        </Rate>
        <Tabs>
          <TabButton
            onClick={handleCharacteristicClick}
            $isActive={option === Option.Description}
          >
          Характеристики
          </TabButton>
          <TabButton
            onClick={handleDescriptionClick}
            $isActive={option === Option.Characteristic}
          >
          Описание
          </TabButton>

          <TabsContent>
            <Table $isHidden={option === Option.Description}>
              <tbody>
                <TabBlock key={vendorCode} title="Артикул:" value={vendorCode}/>
                <TabBlock key={rusType} title="Тип:" value={rusType}/>
                <TabBlock key={stringCount} title="Количество струн:" value={`${stringCount} струнная`}/>
              </tbody>
            </Table>
            <Description $isHidden={option === Option.Characteristic}>{description}</Description>
          </TabsContent>
        </Tabs>
      </ProductInfoWrapper>
      <ProductWrapper>
        <ProductTitle>Цена:</ProductTitle>
        <ProductValue>{stringPrice} ₽</ProductValue>
        <ButtonAddToCart
          onClick={handleBuyClick}
        >Добавить в корзину
        </ButtonAddToCart>
      </ProductWrapper>
    </ProductContainer>
  );
}

