import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ParamName } from '../../../const';

import { getMaxPrice, getMinPrice, getUserMaxPrice, getUserMinPrice } from '../../../store/filter-reducer/filter-reducer-selector';
import { getPriceFromUrl, makeNewSearch } from '../../../utils/param-utils';


const ZERO_STRING = '0';


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
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, 1);
    push(newSearch);
  };

  const handleMinPriceChange = (evt: FormEvent<HTMLInputElement>) => pushPriceByType(evt, ParamName.Filter.PriceGte);
  const handleMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => pushPriceByType(evt, ParamName.Filter.PriceLte);

  const minPriceAttribute = minCatalogPrice ? minCatalogPrice : '0';
  const maxPriceAttribute = maxCatalogPrice ? maxCatalogPrice : '0';


  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            data-testid='priceMin'
            type="number" id="priceMin" name="от"
            placeholder={`${minPriceAttribute}`} min={minPriceAttribute} max={maxPriceAttribute}
            onBlur={handleMinPriceBlur} value={`${minPrice}`} onChange={handleMinPriceChange}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            data-testid='priceMax'
            type="number" id="priceMax" name="до"
            placeholder={`${maxPriceAttribute}`} min={minPriceAttribute} max={maxPriceAttribute}
            onBlur={handleMaxPriceBlur} value={`${maxPrice}`} onChange={handleMaxPriceChange}
          />
        </div>
      </div>
    </fieldset>
  );
}
