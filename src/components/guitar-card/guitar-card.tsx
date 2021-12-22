import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../rating/rating';
import { setPopupType, setGuitarToPopup } from '../../store/actions';
import { GuitarWithComments } from '../../types/types';
import { getTruePath, makeStringPrice } from '../../utils/utils';
import { PopupType } from '../../const';


const GUITAR_PATH = 'guitars';

export default function GuitarCard({guitar} : {guitar : GuitarWithComments}): JSX.Element {
  const {id, name, previewImg, rating, price, comments} = guitar;

  const stringPrice = makeStringPrice(price);

  const {src, srcSet} = getTruePath(previewImg);
  const path = `${GUITAR_PATH}/${id}`;

  const dispatch = useDispatch();
  const handleBuyClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    dispatch(setGuitarToPopup(guitar));
    dispatch(setPopupType(PopupType.CartAdd));
  };

  return (

    <div className="product-card"><img src={src} srcSet={srcSet} width="75" height="190" alt="СURT Z30 Plus Acoustics"/>

      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <Rating rating={rating} height='12' width='14'/>

          <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{stringPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={path}>Подробнее</Link>
        <a
          onClick={handleBuyClick}
          className="button button--red button--mini button--add-to-cart" href="/"
        >Купить
        </a>
      </div>
    </div>
  );
}
