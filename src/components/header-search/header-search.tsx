import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchGuitarsWithSearch } from '../../store/api-actions';
import { getSearchGuitars } from '../../store/main-reducer/main-reducer-selectors';
import { Guitar } from '../../types/types';


const GUITAR_PATH = '/guitars';
const CLASS_HIDDEN = 'hidden';
const ENTER = 'Enter';


function OneSearchGuitar({guitar, onClick} : {guitar: Guitar, onClick: () => void}): JSX.Element{

  const history = useHistory();
  const dispatch = useDispatch();

  const {id, name} = guitar;

  const handleGuitarClick = () => {
    history.push(`${GUITAR_PATH}/${id}`);
    onClick();
    dispatch(fetchGuitarsWithSearch(''));
  };

  return (
    <li
      onClick={handleGuitarClick}
      onKeyDown={(evt) => {
        if (evt.code === ENTER) {
          evt.currentTarget.click();
        }
      }}
      className="form-search__select-item" tabIndex={0}
    >
      {name}
    </li>);
}


export default function HeaderSearch(): JSX.Element {

  const searchGuitars = useSelector(getSearchGuitars);

  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const handleSearchInput = (evt: FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
    dispatch(fetchGuitarsWithSearch(evt.currentTarget.value));
  };

  const searchList = searchGuitars.map((guitar) => <OneSearchGuitar guitar={guitar} key={guitar.id} onClick={() => setValue('')}/>);

  return (

    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          value={value}
          onChange={handleSearchInput}
          className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>

      <ul className={`form-search__select-list ${value.length ? '' : CLASS_HIDDEN}`} style={{zIndex: 2}}>

        {searchList}

      </ul>
    </div>
  );
}
