import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../filter/filter';
import GuitarCard from '../guitar-card/guitar-card';
import NotFoundPage from '../not-found-page/not-found-page';
import Pagination from '../pagination/pagination';
import SortBlock from '../sort-block/sort-block';
import Spinner from '../spinner/spinner';

import { fetchGuitarsWithPath } from '../../store/api-actions';
import { getGuitarCount, getGuitars, getGuitarsErrorStatus, getGuitarsLoadingStatus } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { getPageParamsFromUrl, makeNewSearch } from '../../utils/param-utils';
import { APPRoute, MESSAGE_NO_GUITARS } from '../../const';
import useDebounce from '../../hooks/use-debounce';
import Breadcrumb from '../breadcrumbs/breadcrumb';
import { BreadcrumbsList, Main, PageContainer, TitleBiggerPC } from '../_common/common';
import styled from 'styled-components';


const DEBOUNCE_TIME = 300;
const FIRST_PAGE_NUMBER = 1;


const CatalogDiv = styled.div`
  display: grid;
  align-content: start;
  align-items: start;
  justify-content: start;

  width: 100%;

  gap: 0 25px;
  grid-template-areas: "filters sorter" "filters catalog" "filters pagination";
  grid-template-columns: 215px 1fr;
  grid-template-rows: -webkit-min-content 1fr -webkit-min-content;
  grid-template-rows:         min-content 1fr min-content;
  justify-items: start;`;

const Cards = styled.div`
  margin: 30px 0 0;
  display: grid;
  align-content: flex-start;
  justify-content: flex-start;
  gap: 20px;
  grid-area: catalog;
  grid-template-columns: repeat(3, 1fr);
`;


export default function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars);
  const isError = useSelector(getGuitarsErrorStatus);
  const isLoading = useSelector(getGuitarsLoadingStatus);

  const guitarCount = useSelector(getGuitarCount);

  const dispatch = useDispatch();
  const {search} = useLocation();

  const [url, setUrl] = useState<null | string>(null);

  const debouncedUrl = useDebounce(url, DEBOUNCE_TIME);


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


  if (currentPage > pageCount && currentPage !== FIRST_PAGE_NUMBER) {
    return <NotFoundPage/>;
  }

  const guitarCards = guitars.map((guitar) => <GuitarCard guitar={guitar} key={guitar.id}/>);
  const messageNoGuitar = <h2 style={{textAlign: 'center'}}>{MESSAGE_NO_GUITARS}</h2>;

  return (
    <Main>
      <PageContainer>
        <TitleBiggerPC>Каталог гитар</TitleBiggerPC>

        <BreadcrumbsList>
          <Breadcrumb type={APPRoute.Main}/>
          <Breadcrumb type={APPRoute.Catalog}/>
        </BreadcrumbsList>

        <CatalogDiv>

          <Filter/>

          <SortBlock/>
          <Cards>

            {guitarCards.length ? guitarCards : messageNoGuitar}

          </Cards>

          <Pagination/>

        </CatalogDiv>
      </PageContainer>
    </Main>
  );
}
