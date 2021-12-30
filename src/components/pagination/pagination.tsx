import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ParamName } from '../../const';
import { getCurrentPage, getGuitarCount, getLimit } from '../../store/pagination-reducer/pagination-reducer-selectors';
import { getDisplayPages, getPageCount, getPageVisualData } from '../../utils/pagination-utils';
import { makeNewSearch } from '../../utils/param-utils';


function Page({page} : {page : number}): JSX.Element {

  const currentPage = useSelector(getCurrentPage);
  const guitarCount = useSelector(getGuitarCount);
  const limit = useSelector(getLimit);

  const pageCount = getPageCount(guitarCount, limit);

  const {linkPage, classes, textPage} = getPageVisualData(pageCount, currentPage, page);

  const {search} = useLocation();
  const {push} = useHistory();

  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const newSearch = makeNewSearch(search, ParamName.Range.Page, linkPage);
    push(newSearch);
  };

  return (
    <li className={classes}>
      <a
        onClick={handlePageClick}
        className="link pagination__page-link" href='/'
      >
        {textPage}
      </a>
    </li>
  );
}

export default function Pagination(): JSX.Element {

  const currentPage = useSelector(getCurrentPage);
  const guitarCount = useSelector(getGuitarCount);
  const limit = useSelector(getLimit);

  const pageCount = getPageCount(guitarCount, limit);

  const displayPages = getDisplayPages(pageCount, currentPage);

  const pages = displayPages.map((page) => <Page page={page} key={page}/> );

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {pages}

      </ul>
    </div>
  );
}
