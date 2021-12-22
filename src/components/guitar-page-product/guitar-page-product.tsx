import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarInfo, GuitarType, PopupType } from '../../const';
import { setGuitarToPopup, setPopupType } from '../../store/actions';
import { getGuitarErrorStatus, getGuitarLoadingStatus, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import { getTruePath, makeStringPrice } from '../../utils/utils';
import NotFoundPage from '../not-found-page/not-found-page';
import Rating from '../rating/rating';
import Spinner from '../spinner/spinner';


//!! В Н Е   Т З !!


const enum Option {
  Characteristic = 'Characteristic',
  Description = 'Description',
}


export default function GuitarPageProduct(): JSX.Element{

  const guitar = useSelector(getTheGuitar);
  const isError = useSelector(getGuitarErrorStatus);
  const isLoading = useSelector(getGuitarLoadingStatus);

  const dispatch = useDispatch();

  const [option, setOption] = useState(Option.Characteristic);

  if (isError) {
    return <NotFoundPage/>;
  }

  if (isLoading || !guitar) {
    return <Spinner/>;
  }

  const {name, previewImg, price, rating, stringCount, type, vendorCode, description} = guitar;
  const stringPrice = makeStringPrice(price);


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
      <img className="product-container__img" src={src} srcSet={srcSet} width="90" height="235" alt=""/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <Rating rating={rating} height='14' width='14'/>

          <span className="rate__count"></span><span className="rate__message"></span>
        </div>
        <div className="tabs">
          <a
            className={`button button--medium tabs__button ${option === Option.Description && 'button--black-border'}`}
            href="#characteristics"
            onClick={handleCharacteristicClick}
          >
             Характеристики
          </a>
          <a
            className={`button button--medium tabs__button ${option === Option.Characteristic && 'button--black-border'}`}
            href="#description"
            onClick={handleDescriptionClick}
          >
            Описание
          </a>
          <div className="tabs__content" id="characteristics"  >
            <table className={`tabs__table ${option === Option.Description && 'hidden'}`}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{rusType}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{stringCount} струнная</td>
                </tr>
              </tbody>
            </table>
            <p className={`tabs__product-description ${option === Option.Characteristic && 'hidden'}`}>{description}</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{stringPrice} ₽</p>
        <a
          onClick={handleBuyClick}
          className="button button--red button--big product-container__button" href="/"
        >Добавить в корзину
        </a>
      </div>
    </div>
  );
}
