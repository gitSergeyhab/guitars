import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BreadcrumbMain from '../breadcrumbs/breadcramb-main/breadcramb-main';
import BreadcrumbCatalog from '../breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import Filter from '../filter/filter';
import GuitarCard from '../guitar-card/guitar-card';
import NotFoundPage from '../not-found-page/not-found-page';
import Pagination from '../pagination/pagination';
import SortBlock from '../sort-block/sort-block';
import Spinner from '../spinner/spinner';

import { fetchGuitarsWithPath } from '../../store/api-actions';
import { getGuitarCount, getGuitars, getGuitarsErrorStatus, getGuitarsLoadingStatus } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { getPageParamsFromUrl, makeNewSearch } from '../../utils/param-utils';
import { MESSAGE_NO_GUITARS } from '../../const';
import useDebounce from '../../hooks/use-debounce';


export default function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars);
  const isError = useSelector(getGuitarsErrorStatus);
  const isLoading = useSelector(getGuitarsLoadingStatus);

  const guitarCount = useSelector(getGuitarCount);

  const dispatch = useDispatch();
  const {search} = useLocation();

  const [url, setUrl] = useState<null | string>(null);

  const debouncedUrl = useDebounce(url, 300);


  useEffect(() => {
    setUrl(makeNewSearch(search));
  }, [search]);


  useEffect(() => {
    if (debouncedUrl !== null) {
      dispatch(fetchGuitarsWithPath(debouncedUrl));
    }
  }, [dispatch, debouncedUrl]);


  const {currentPage, pageCount} = getPageParamsFromUrl(search, guitarCount);


  if (isError) {
    return <NotFoundPage/>;
  }

  if (isLoading) {
    return <Spinner/>;
  }


  if (currentPage > pageCount && currentPage !== 1) {
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
