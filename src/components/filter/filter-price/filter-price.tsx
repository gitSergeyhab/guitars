import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getMaxPrice, getMinPrice } from '../../../store/catalog-reducer/catalog-reducer-selectors';
import { getPriceFromUrl, makeNewSearch } from '../../../utils/param-utils';
import { DEFAULT_PAGE_FOR_PUSH, ParamName } from '../../../const';
import { FilterFieldset, FilterLegend, FormInputContainer, HiddenLabel } from '../../_common/common';
import styled from 'styled-components';


const ZERO_STRING = '0';

const PriceRangeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  &::after {
    top: 50%;
    left: 50%;
    position: absolute;

    display: block;

    width: 15px;
    height: 2px;
    margin-top: -2px;

    background-color: #585757;

    content: "";
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
  }
  & input {
    width: 85px;
    height: 30px;
  }

  & input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  & input::-moz-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  & input:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  & input::-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  & input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  `;


export default function FilterPrice(): JSX.Element {

  const {search} = useLocation();
  const {push} = useHistory();

  const minCatalogPrice = useSelector(getMinPrice);
  const maxCatalogPrice = useSelector(getMaxPrice);

  const minPrice = getPriceFromUrl(search, ParamName.Filter.PriceGte) as null | number;
  const maxPrice =  getPriceFromUrl(search, ParamName.Filter.PriceLte) as null | number;

  const pushPriceByBlur = (price: number | null, param: string) => {
    if (!price && price !== null && price !== 0) { // если ничего не введено => price.isNaN();
      return;
    }
    let newSearch = makeNewSearch(search, param, price);
    if (price !== null && minCatalogPrice !==null && price < minCatalogPrice) {
      newSearch = makeNewSearch(search, param, minCatalogPrice);
    } else if (price !== null && maxCatalogPrice !==null && price > maxCatalogPrice) {
      newSearch = makeNewSearch(search, param, maxCatalogPrice);
    }
    push(newSearch);
  };

  const handleMinPriceBlur = () => pushPriceByBlur(minPrice, ParamName.Filter.PriceGte);
  const handleMaxPriceBlur = () => pushPriceByBlur(maxPrice, ParamName.Filter.PriceLte);

  const pushPriceByType = (evt: FormEvent<HTMLInputElement>, param: string) => {
    let newSearch = makeNewSearch(search, param, evt.currentTarget.value || ZERO_STRING);
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, DEFAULT_PAGE_FOR_PUSH);
    push(newSearch);
  };

  const handleMinPriceChange = (evt: FormEvent<HTMLInputElement>) => pushPriceByType(evt, ParamName.Filter.PriceGte);
  const handleMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => pushPriceByType(evt, ParamName.Filter.PriceLte);

  const minPriceAttribute = minCatalogPrice ? minCatalogPrice : ZERO_STRING;
  const maxPriceAttribute = maxCatalogPrice ? maxCatalogPrice : ZERO_STRING;


  return (
    <FilterFieldset>
      <FilterLegend>Цена, ₽</FilterLegend>
      <PriceRangeContainer>
        <FormInputContainer>
          <HiddenLabel>Минимальная цена</HiddenLabel>
          <input
            data-testid='priceMin'
            type="number" id="priceMin" name="от"
            placeholder={`${minPriceAttribute}`} min={minPriceAttribute} max={maxPriceAttribute}
            onBlur={handleMinPriceBlur} value={`${minPrice}`} onChange={handleMinPriceChange}
          />
        </FormInputContainer>
        <FormInputContainer>
          <HiddenLabel>Максимальная цена</HiddenLabel>
          <input
            data-testid='priceMax'
            type="number" id="priceMax" name="до"
            placeholder={`${maxPriceAttribute}`} min={minPriceAttribute} max={maxPriceAttribute}
            onBlur={handleMaxPriceBlur} value={`${maxPrice}`} onChange={handleMaxPriceChange}
          />
        </FormInputContainer>
      </PriceRangeContainer>
    </FilterFieldset>
  );
}
