import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import useDebounce from '../../hooks/use-debounce';
import { loadSearchGuitars } from '../../store/actions';
import { fetchGuitarsWithSearch } from '../../store/api-actions';
import { getSearchGuitars, getSearchLoadingStatus } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { Guitar } from '../../types/types';
import { HiddenLabel, HiddenSpan } from '../_common/common';


const GUITAR_PATH = '/guitars';
const ENTER = 'Enter';


const SearchInput = styled.input.attrs({ id: 'search', type: 'text', autoComplete: 'off', placeholder: 'что вы ищите?'})`
  border: none;
  outline: none;
  background: transparent;

  width: 260px;
  padding-right: 20px;
  font-size: 14px;
  line-height: 19px;
  color: inherit;

  &::-webkit-input-placeholder {
    font-size: 12px;
    line-height: 16px;
    color: #c5c4c4;
  }

  &::-moz-placeholder {
    font-size: 12px;
    line-height: 16px;
    color: #c5c4c4;
  }

  &:-ms-input-placeholder {
    font-size: 12px;
    line-height: 16px;
    color: #c5c4c4;
  }

  &::-ms-input-placeholder {
    font-size: 12px;
    line-height: 16px;
    color: #c5c4c4;
  }

  &::placeholder {
    font-size: 12px;
    line-height: 16px;
    color: #c5c4c4;
  }`;

const SearchIcon = styled.svg.attrs({ width: '14', height: '15' })`
  top: 50%;
  left: 50%;
  position: absolute;

  width: 14px;
  height: 15px;

  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  `;

const SearchForm = styled.form`
  display: flex;

  -webkit-box-sizing: border-box;
          box-sizing: border-box;

  border: 1px solid rgba(254, 250, 250, 0.6);
  border-radius: 2px;
  background: inherit;

  -webkit-transition: border-color 0.3s ease;
          transition: border-color 0.3s ease;
  &:hover,
  &:focus {
    border: 1px solid #545454;
  }
  `;

const SearchButton = styled.button.attrs({ type: 'button' })`
  border: none;
  outline: none;
  background: transparent;
  position: relative;

  width: 38px;
  height: 38px;
  padding: 0;

  color: #ffffff;

  cursor: pointer;
  -webkit-transition: color 0.3s ease;
          transition: color 0.3s ease;
  &:hover,
  &:focus {
    color: #c90606;
  }
  `;

const SearchList = styled.ul`
  top: 39px;
  left: 0;
  position: absolute;

  overflow-y: scroll;

  width: 100%;
  min-height: 100%;
  max-height: 120px;
  margin: 0;
  padding: 2px 15px 5px 38px;

  list-style: none;

  font-size: 14px;
  line-height: 19px;

  color: inherit;
  border: 1px solid rgba(254, 250, 250, 0.6);
  border-radius: 2px;
  background: inherit;

  -webkit-appearance: none;
    -moz-appearance: none;
          appearance: none;
  z-index: 2;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    height: 95px;

    border: 2px solid rgba(232, 229, 229, 0.5);
    border-radius: 6px;
    background-color: transparent;
  }
  &:hover,
  &:focus {
    border: 1px solid #545454;
  }
${({ $isVisible } : { $isVisible: boolean }) => $isVisible ? '' : css`display: none`}
`;

const SearchItem = styled.li`
padding-top: 4px;
padding-bottom: 4px;

font-size: 14px;
line-height: 19px;

color: inherit;

cursor: pointer;
-webkit-transition: color 0.3s ease;
        transition: color 0.3s ease;
&:hover,
&:focus {
  color: #545454;
}
`;

function OneSearchGuitar({guitar, onClick} : {guitar: Guitar, onClick: () => void}): JSX.Element{

  const history = useHistory();
  const dispatch = useDispatch();

  const {id, name} = guitar;

  const handleGuitarClick = () => {
    history.push(`${GUITAR_PATH}/${id}`);
    dispatch(loadSearchGuitars([]));
    onClick();
  };

  return (
    <SearchItem
      onClick={handleGuitarClick}
      onKeyDown={(evt) => {
        if (evt.code === ENTER) {
          evt.currentTarget.click();
        }
      }}
      tabIndex={0}
    >
      {name}
    </SearchItem>);
}


export default function HeaderSearch(): JSX.Element {

  const searchGuitars = useSelector(getSearchGuitars);

  const dispatch = useDispatch();
  const isLoading = useSelector(getSearchLoadingStatus);

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const handleSearchInput = (evt: FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      dispatch(fetchGuitarsWithSearch(debouncedValue));
    } else {
      dispatch(loadSearchGuitars([]));
    }
  }, [debouncedValue, dispatch]);

  const guitars = searchGuitars.map((guitar) => <OneSearchGuitar guitar={guitar} key={guitar.id} onClick={() => setValue('')}/>);

  const guitarList = isLoading ? null :
    <SearchList $isVisible={!!debouncedValue.length && !!value.length} >{ guitars }</SearchList>;

  return (

    <div className="form-search">
      <SearchForm>
        <SearchButton>
          <SearchIcon aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </SearchIcon>
          <HiddenSpan>Начать поиск</HiddenSpan>
        </SearchButton>
        <SearchInput
          value={value}
          onChange={handleSearchInput}
        />
        <HiddenLabel htmlFor="search">Поиск</HiddenLabel>
      </SearchForm>

      { guitars.length ? guitarList : null }

    </div>
  );
}
