import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getGuitarCount } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { getDisplayPages, getPageVisualData } from '../../utils/pagination-utils';
import { getPageParamsFromUrl, makeNewSearch } from '../../utils/param-utils';
import { ParamName } from '../../const';
import styled, { css } from 'styled-components';
import { StyledLink } from '../_common/common';


const PaginationWrapper = styled.div`
  margin: 26px 0 0 0;
  width: 100%;
  grid-area: pagination;
`;

const PaginationList = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin: 0 19px 0 0;
  padding: 0;
  list-style: none;`;

const nextPageCss = css`
  & a {
    padding: 2px 15px 2px 15px;
  }
`;

const activePageCss = css`
  color: #ffffff;
  border-radius: 2px;
  background-color: #131212;
  pointer-events: none;
`;

const PageLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  height: 25px;
  margin-left: 10px;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.05em;

  ${({ $isNext, $isCurrent } : { $isNext: boolean, $isCurrent: boolean }) =>
  {
    const current = $isCurrent ? activePageCss : '';
    const next = $isNext ? nextPageCss : '';
    return `${current} ${next}`;
  }
}
}`;

const PageLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border: 0.7px solid #585757;
  border-radius: 2px;

  -webkit-transition: color 0.3s ease, border-color 0.3s ease;
          transition: color 0.3s ease, border-color 0.3s ease;
  &:hover {
    color: #c90606;
  }
  &:active {
    border-color: #545454;
  }
`;

function Page({page} : {page : number}): JSX.Element {

  const guitarCount = useSelector(getGuitarCount);

  const {push} = useHistory();
  const {search} = useLocation();
  const {currentPage, pageCount} = getPageParamsFromUrl(search, guitarCount);

  const {linkPage, textPage, isCurrent, isNext} = getPageVisualData(pageCount, currentPage, page);


  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const newSearch = makeNewSearch(search, ParamName.Range.Page, linkPage);
    push(newSearch);
  };

  return (
    <PageLi $isCurrent={isCurrent} $isNext={isNext}>
      <PageLink
        onClick={handlePageClick}
        to='/'
      >
        {textPage}
      </PageLink>
    </PageLi>
  );
}

export default function Pagination(): JSX.Element {

  const guitarCount = useSelector(getGuitarCount);

  const {search} = useLocation();
  const {currentPage, pageCount} = getPageParamsFromUrl(search, guitarCount);

  const displayPages = getDisplayPages(pageCount, currentPage);

  const pages = displayPages.map((page) => <Page page={page} key={page}/> );

  return (
    <PaginationWrapper>
      <PaginationList>

        {pages}

      </PaginationList>
    </PaginationWrapper>
  );
}
