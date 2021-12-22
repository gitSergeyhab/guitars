import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StringPage } from '../../const';
import { setCurrentPage } from '../../store/actions';
import { getCurrentPage, getGuitarCount, getLimit } from '../../store/pagination-reducer/pagination-reducer-selectors';
import { getDisplayPages, getPageCount, getStringPage } from '../../utils/pagination-utils';


const CLASS_NEXT = 'pagination__page--next';
const CLASS_ACTIVE = 'pagination__page--active';
const CLASS_USUAL = 'pagination__page';


function Page({page} : {page : number}): JSX.Element {

  const currentPage = useSelector(getCurrentPage);
  const guitarCount = useSelector(getGuitarCount);
  const limit = useSelector(getLimit);

  const pageCount = getPageCount(guitarCount, limit);

  const displayPages = getDisplayPages(pageCount, currentPage); // массив со станицами, отображаемыми в пагинации

  const first = displayPages[0];
  const last = displayPages[displayPages.length - 1];

  const {firsPage, lastPage} = getStringPage(currentPage, first, last);

  let displayPage = page.toString(); // отображения страницы: цыфра/назад/далее
  displayPage = page === first ? firsPage : displayPage;
  displayPage = page === last ? lastPage : displayPage;

  let liClasses = CLASS_USUAL;
  const nextClass = displayPage === StringPage.Next || displayPage === StringPage.Prev ? CLASS_NEXT : '';
  liClasses = currentPage === page ? `${liClasses} ${CLASS_ACTIVE}` : `${liClasses} ${nextClass}`;

  const dispatch = useDispatch();
  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(page));
  };


  return (
    <li className={liClasses}>
      <a
        onClick={handlePageClick}
        className="link pagination__page-link" href='/'
      >
        {displayPage}
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
