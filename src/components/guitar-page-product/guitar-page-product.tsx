import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../rating/rating';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { Guitar } from '../../types/types';
import { getRealRating, getTruePath, makeStringPrice } from '../../utils/utils';
import { GuitarInfo, GuitarType, HIDDEN_CLASS, PopupType } from '../../const';
import { getComments } from '../../store/guitar-reducer/guitar-reducer-selectors';


const BLACK_BORDER_CLASS = 'button--black-border';

const enum Option {
  Characteristic = 'Characteristic',
  Description = 'Description',
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
    <div className="product-container">
      <img className="product-container__img" src={src} srcSet={srcSet} width="90" height="235" alt={name}/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">??????????????:</span>

          <Rating rating={realRating} height='14' width='14'/>

          <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
        </div>
        <div className="tabs">
          <a
            className={`button button--medium tabs__button ${option === Option.Description && BLACK_BORDER_CLASS}`}
            href="#characteristics"
            onClick={handleCharacteristicClick}
          >
             ????????????????????????????
          </a>
          <a
            className={`button button--medium tabs__button ${option === Option.Characteristic && BLACK_BORDER_CLASS}`}
            href="#description"
            onClick={handleDescriptionClick}
          >
            ????????????????
          </a>
          <div className="tabs__content" id="characteristics"  >
            <table className={`tabs__table ${option === Option.Description && HIDDEN_CLASS}`}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">??????????????:</td>
                  <td className="tabs__value">{vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">??????:</td>
                  <td className="tabs__value">{rusType}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">???????????????????? ??????????:</td>
                  <td className="tabs__value">{stringCount} ????????????????</td>
                </tr>
              </tbody>
            </table>
            <p className={`tabs__product-description ${option === Option.Characteristic && HIDDEN_CLASS}`}>{description}</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">????????:</p>
        <p className="product-container__price-info product-container__price-info--value">{stringPrice} ???</p>
        <a
          onClick={handleBuyClick}
          className="button button--red button--big product-container__button" href="/"
        >???????????????? ?? ??????????????
        </a>
      </div>
    </div>
  );
}
