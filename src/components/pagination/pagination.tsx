import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/actions';
import { getCurrentPage, getGuitarCount, getLimit } from '../../store/pagination-reducer/pagination-reducer-selectors';
import { getDisplayPages, getPageCount, getPageVisualData } from '../../utils/pagination-utils';


function Page({page} : {page : number}): JSX.Element {

  const currentPage = useSelector(getCurrentPage);
  const guitarCount = useSelector(getGuitarCount);
  const limit = useSelector(getLimit);

  const pageCount = getPageCount(guitarCount, limit);

  const {linkPage, classes, textPage} = getPageVisualData(pageCount, currentPage, page);

  const dispatch = useDispatch();
  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(linkPage));
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
