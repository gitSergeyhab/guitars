import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ParamName } from '../../../const';

import { getMaxPrice, getMinPrice, getUserMaxPrice, getUserMinPrice } from '../../../store/filter-reducer/filter-reducer-selector';
import { makeNewSearch } from '../../../utils/param-utils';


export default function FilterPrice(): JSX.Element {

  const {search} = useLocation();
  const {push} = useHistory();

  const minCatalogPrice = useSelector(getMinPrice);
  const maxCatalogPrice = useSelector(getMaxPrice);
  const minPrice = useSelector(getUserMinPrice);
  const maxPrice = useSelector(getUserMaxPrice);

  const handleMinPriceBlur = () => {
    let newSearch = makeNewSearch(search, ParamName.Filter.PriceGte, minPrice || '');
    if (minPrice !== null && minCatalogPrice !==null && minPrice < minCatalogPrice) {
      newSearch = makeNewSearch(search, ParamName.Filter.PriceGte, minCatalogPrice);
    } else if (minPrice !== null && maxCatalogPrice !==null && minPrice > maxCatalogPrice) {
      newSearch = makeNewSearch(search, ParamName.Filter.PriceGte, maxCatalogPrice);
    }
    push(newSearch);
  };

  const handleMaxPriceBlur = () => {
    let newSearch = makeNewSearch(search, ParamName.Filter.PriceLte, maxPrice || '');
    if (maxPrice !== null && minCatalogPrice !==null && maxPrice < minCatalogPrice) {
      newSearch = makeNewSearch(search, ParamName.Filter.PriceLte, minCatalogPrice);
    } else if (maxPrice !== null && maxCatalogPrice !==null && maxPrice > maxCatalogPrice) {
      newSearch = makeNewSearch(search, ParamName.Filter.PriceLte, maxCatalogPrice);
    }
    push(newSearch);
  };

  const pushPriceByType = (evt: FormEvent<HTMLInputElement>, param: string) => {
    let newSearch = makeNewSearch(search, param, evt.currentTarget.value);
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, 1);
    push(newSearch);
  };

  const handleMinPriceChange = (evt: FormEvent<HTMLInputElement>) => pushPriceByType(evt, ParamName.Filter.PriceGte);
  const handleMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => pushPriceByType(evt, ParamName.Filter.PriceLte);

  const minPriceAttribute = minCatalogPrice ? minCatalogPrice : '';
  const maxPriceAttribute = maxCatalogPrice ? maxCatalogPrice : '';


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
