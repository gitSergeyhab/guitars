
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ParamName } from '../../const';
import { getOrder, getSort, getSortStatus } from '../../store/sort-reducer/sort-reducer-selectors';
import { makeNewSearch } from '../../utils/param-utils';


const enum ClassActive {
  Sort = 'catalog-sort__type-button--active',
  Order = 'catalog-sort__order-button--active',
}

const styleGrayText = {color: '#585757'};


export default function SortBlock(): JSX.Element {

  const isSort = useSelector(getSortStatus);

  const {push} = useHistory();
  const {search} = useLocation();

  const pushByClick = (param: string, value: string, secondParam: string, secondValue: string) => {
    let newSearch = makeNewSearch(search, param, value);
    if (!isSort) {
      newSearch = makeNewSearch(newSearch, secondParam, secondValue);
    }
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, 1);
    push(newSearch);
  };

  const handlePriceClick = () =>
    pushByClick(ParamName.Sort.Sort, ParamName.Sort.Price, ParamName.Sort.Order, ParamName.Sort.Asc);

  const handleRatingClick = () =>
    pushByClick(ParamName.Sort.Sort, ParamName.Sort.Rating, ParamName.Sort.Order, ParamName.Sort.Asc);

  const handleAscClick = () =>
    pushByClick(ParamName.Sort.Order, ParamName.Sort.Asc, ParamName.Sort.Sort, ParamName.Sort.Price);

  const handleDescClick = () =>
    pushByClick(ParamName.Sort.Order, ParamName.Sort.Desc, ParamName.Sort.Sort, ParamName.Sort.Price);


  // const handleRatingClick = () => {
  //   let newSearch = makeNewSearch(search, ParamName.Sort.Sort, ParamName.Sort.Rating);
  //   if (!isSort) {
  //     newSearch = makeNewSearch(newSearch, ParamName.Sort.Order, ParamName.Sort.Asc);
  //   }
  //   newSearch = makeNewSearch(newSearch, ParamName.Range.Page, 1);
  //   push(newSearch);
  // };

  // const handleAscClick = () => {
  //   let newSearch = makeNewSearch(search, ParamName.Sort.Order, ParamName.Sort.Asc);
  //   if (!isSort) {
  //     newSearch = makeNewSearch(newSearch, ParamName.Sort.Sort, ParamName.Sort.Price);
  //   }
  //   newSearch = makeNewSearch(newSearch, ParamName.Range.Page, 1);
  //   push(newSearch);
  // };

  // const handleDescClick = () => {
  //   let newSearch = makeNewSearch(search, ParamName.Sort.Order, ParamName.Sort.Desc);
  //   if (!isSort) {
  //     newSearch = makeNewSearch(newSearch, ParamName.Sort.Sort, ParamName.Sort.Price);
  //   }
  //   newSearch = makeNewSearch(newSearch, ParamName.Range.Page, 1);
  //   push(newSearch);
  // };

  const order = useSelector(getOrder);
  const sort = useSelector(getSort);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">

        <button
          onClick={handlePriceClick}
          // стили в исходной верстке не работают, поэтому так:
          style={sort === ParamName.Sort.Price ? {} : styleGrayText}
          className={`catalog-sort__type-button ${sort === ParamName.Sort.Price ? ClassActive.Sort : ''}`}
          aria-label="по цене" tabIndex={ sort === ParamName.Sort.Price ? -1 : 0}
        >по цене
        </button>

        <button
          onClick={handleRatingClick}
          style={sort === ParamName.Sort.Rating ? {} : styleGrayText}
          className={`catalog-sort__type-button ${sort === ParamName.Sort.Rating ? ClassActive.Sort : ''}`}
          aria-label="по цене" tabIndex={ sort === ParamName.Sort.Rating ? -1 : 0}
        >по популярности
        </button>

      </div>
      <div className="catalog-sort__order">

        <button
          onClick={handleAscClick}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${order === ParamName.Sort.Asc ? ClassActive.Order : ''}`}
          aria-label="По возрастанию"  tabIndex={ order === ParamName.Sort.Asc ? -1 : 0}
        >
        </button>

        <button
          onClick={handleDescClick}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${order === ParamName.Sort.Desc ? ClassActive.Order : ''}`}
          aria-label="По убыванию" tabIndex={ order === ParamName.Sort.Desc ? -1 : 0}
        >
        </button>

      </div>
    </div>
  );
}
