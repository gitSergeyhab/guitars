import { useDispatch, useSelector } from 'react-redux';
import { ParamName } from '../../const';
import { setCurrentPage, setOrder, setSort } from '../../store/actions';
import { getOrder, getSort, getSortStatus } from '../../store/sort-reducer/sort-reducer-selectors';


const enum ClassActive {
  Sort = 'catalog-sort__type-button--active',
  Order = 'catalog-sort__order-button--active',
}

const styleGrayText = {color: '#585757'};


export default function SortBlock(): JSX.Element {

  const dispatch = useDispatch();
  const isSort = useSelector(getSortStatus);

  const handlePriceClick = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSort(ParamName.Sort.Price));
    if (!isSort) {
      dispatch(setOrder(ParamName.Sort.Asc));
    }
  };

  const handleRatingClick = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSort(ParamName.Sort.Rating));
    if (!isSort) {
      dispatch(setOrder(ParamName.Sort.Asc));
    }
  };

  const handleAscClick = () => {
    dispatch(setCurrentPage(1));
    dispatch(setOrder(ParamName.Sort.Asc));
    if (!isSort) {
      dispatch(setSort(ParamName.Sort.Price));
    }
  };

  const handleDescClick = () => {
    dispatch(setCurrentPage(1));
    dispatch(setOrder(ParamName.Sort.Desc));
    if (!isSort) {
      dispatch(setSort(ParamName.Sort.Price));
    }
  };

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
