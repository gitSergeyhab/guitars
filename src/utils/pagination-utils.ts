import { PageClass, StringPage } from '../const';


const MIN_COUNT_FOR_ADDITIONAL_PAGE = 4;

const FIRST_PAGE = 1;

const PageDifference = {
  Max: 3,
  Mid: 2,
  Min: 1,
} as const;

const PageNotTransform = {
  First: 1,
  Third: 3,
} as const;


export const getPageCount = (guitarsCount: number, limit: number): number => Math.ceil(guitarsCount/limit);

export const getPageVisualData = (pageCount: number, currentPage: number, page: number) => {
  let linkPage = page;
  let classes: string = PageClass.Usual;
  let textPage = page.toString();

  if (page > currentPage + PageDifference.Min && page < pageCount ) {
    linkPage = page + PageDifference.Min;
    classes = `${classes} ${PageClass.Next}`;
    textPage = StringPage.Next;
  }

  if (page < currentPage - PageDifference.Min && page > FIRST_PAGE ) {
    linkPage = page - PageDifference.Min;
    classes = `${classes} ${PageClass.Next}`;
    textPage = StringPage.Prev;
  }

  if (
    page === PageNotTransform.First ||
    page === pageCount ||
    (currentPage === PageNotTransform.First && page === PageNotTransform.Third) ||
    (currentPage === pageCount && page === pageCount - PageDifference.Mid)
  ) {
    textPage = page.toString();
    classes = PageClass.Usual;
    linkPage = page;
  }

  classes = currentPage === page ? `${PageClass.Usual} ${PageClass.Active}` : classes;

  return {linkPage, classes, textPage};
};


export const getDisplayPages = (pageCount: number, currentPage: number) : number[] => {

  const pages = [
    pageCount >= MIN_COUNT_FOR_ADDITIONAL_PAGE && currentPage === pageCount ? currentPage - PageDifference.Max : null,
    currentPage - PageDifference.Mid > 0 ? currentPage - PageDifference.Mid : null,
    currentPage - PageDifference.Min > 0 ? currentPage - PageDifference.Min : null,
    currentPage,
    currentPage < pageCount ? currentPage + PageDifference.Min: null,
    currentPage < pageCount - PageDifference.Min ? currentPage + PageDifference.Mid : null,
    pageCount >= MIN_COUNT_FOR_ADDITIONAL_PAGE && currentPage === FIRST_PAGE  ? currentPage + PageDifference.Max : null,
  ];


  const pagesNotNull = pages.filter((item) => item !== null);

  return pagesNotNull as number[];
};
