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
import { getGuitars, getGuitarsErrorStatus, getGuitarsLoadingStatus } from '../../store/main-reducer/main-reducer-selectors';
import { getGuitarCount } from '../../store/pagination-reducer/pagination-reducer-selectors';
import { getPageParamsFromUrl, makeNewSearch } from '../../utils/param-utils';

import { MESSAGE_NO_GUITARS } from '../../const';


export default function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars);
  const isError = useSelector(getGuitarsErrorStatus);
  const isLoading = useSelector(getGuitarsLoadingStatus);

  const guitarCount = useSelector(getGuitarCount);

  const dispatch = useDispatch();
  const {search} = useLocation();


  const {start, currentPage} = getPageParamsFromUrl(search, guitarCount);

  useEffect(() => {
    const newSearch = makeNewSearch(search);
    dispatch(fetchGuitarsWithPath(newSearch));
  }, [dispatch, search]);


  if (isError) {
    return <NotFoundPage/>;
  }

  if (isLoading) {
    return <Spinner/>;
  }

  if ((start >= guitarCount && guitarCount !== 0) || (!start && start !== 0) || (guitarCount === 0 && currentPage > 1)) {
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
