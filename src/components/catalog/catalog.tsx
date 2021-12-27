import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import BreadcrumbMain from '../breadcrumbs/breadcramb-main/breadcramb-main';
import BreadcrumbCatalog from '../breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import Filter from '../filter/filter';
import GuitarCard from '../guitar-card/guitar-card';
import NotFoundPage from '../not-found-page/not-found-page';
import Pagination from '../pagination/pagination';
import SortBlock from '../sort-block/sort-block';
import Spinner from '../spinner/spinner';

import { fetchGuitarsWithPath } from '../../store/api-actions';
import { getCheckedStrings, getUserMaxPrice, getUserMinPrice, getUserTypes } from '../../store/filter-reducer/filter-reducer-selector';
import { getGuitars, getGuitarsErrorStatus, getGuitarsLoadingStatus, getParseFromUrlStatus } from '../../store/main-reducer/main-reducer-selectors';
import { getGuitarCount, getLimit, getStart } from '../../store/pagination-reducer/pagination-reducer-selectors';
import { collectParams, makeFilterParams, makePageParams, makeReducerFromUrl, makeSortParams } from '../../utils/param-utils';
import { Params } from '../../types/types';
import { noParseParamsFromUrl } from '../../store/actions';
import { getOrder, getSort } from '../../store/sort-reducer/sort-reducer-selectors';
import { MESSAGE_NO_GUITARS } from '../../const';


export default function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars);
  const isError = useSelector(getGuitarsErrorStatus);
  const isLoading = useSelector(getGuitarsLoadingStatus);

  const paramsFromUrlStatus = useSelector(getParseFromUrlStatus);
  const limit = useSelector(getLimit);

  const strings = useSelector(getCheckedStrings);
  const types = useSelector(getUserTypes);
  const minPrice = useSelector(getUserMinPrice);
  const maxPrice = useSelector(getUserMaxPrice);
  const sort = useSelector(getSort);
  const order = useSelector(getOrder);
  const start = useSelector(getStart);
  const guitarCount = useSelector(getGuitarCount);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  useEffect(() => { // 1. забирает параметры из строки только при обновлении страницы : url -> reducer -> form
    if (paramsFromUrlStatus) {
      const search = location.search;
      const searchParam = search.split('?')[1] || '';
      const urlParams = qs.parse(searchParam);
      makeReducerFromUrl(urlParams as Params, dispatch); // собирает редьюсеры (filter, sort, pagination)
      dispatch(noParseParamsFromUrl()); // чтоб больше не брал параметры из url
    }
  }, [dispatch, location, paramsFromUrlStatus]);


  useEffect(() => {
    if (!paramsFromUrlStatus) { // 2. а потом берет параметры из формы: form -> reducer -> url
      const filterParams = makeFilterParams({maxPrice, minPrice, strings, types});
      const sortParams = makeSortParams({sort, order});
      const pageParams = makePageParams(start, limit);
      const params = collectParams([filterParams, sortParams, pageParams]);
      const path = `?${qs.stringify(params)}`;
      history.push(path); // просто передает строку в url
      dispatch(fetchGuitarsWithPath(path));
    }
  }, [dispatch, maxPrice, minPrice, strings, types, sort, order, start, history, paramsFromUrlStatus, limit]);


  if (isError) {
    return <NotFoundPage/>;
  }

  if (isLoading) {
    return <Spinner/>;
  }

  if (start >= guitarCount) {
    return <NotFoundPage/>;
  }


  const guitarList = guitars.map((guitar) => <GuitarCard guitar={guitar} key={guitar.id}/>);
  const messageNoGuitar = <h2 style={{textAlign: 'center'}}>{MESSAGE_NO_GUITARS}</h2>;

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>

        <ul className="breadcrumbs page-content__breadcrumbs">
          <BreadcrumbMain/>
          <BreadcrumbCatalog/>
        </ul>

        <div className="catalog">

          <Filter/>

          <SortBlock/>
          <div className="cards catalog__cards">

            {guitarList.length ? guitarList : messageNoGuitar}

          </div>

          <Pagination/>

        </div>
      </div>
    </main>
  );
}
