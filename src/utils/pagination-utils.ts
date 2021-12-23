import { PageClass, StringPage } from '../const';


export const getPageCount = (guitarsCount: number, limit: number): number => Math.ceil(guitarsCount/limit);

export const getPageVisualData = (pageCount: number, currentPage: number, page: number) => {
  let linkPage = page;
  let classes: string = PageClass.Usual;
  let textPage = page.toString();

  if (page > currentPage + 1 && page <  pageCount ) {
    linkPage = page + 1;
    classes = `${classes} ${PageClass.Next}`;
    textPage = StringPage.Next;
  }

  if (page < currentPage - 1 && page > 1 ) {
    linkPage = page - 1;
    classes = `${classes} ${PageClass.Next}`;
    textPage = StringPage.Prev;
  }

  if (page === 1 || page === pageCount || (currentPage === 1 && page === 3) || (currentPage === pageCount && page === pageCount - 2)) {
    textPage = page.toString();
    classes = PageClass.Usual;
    linkPage = page;
  }

  classes = currentPage === page ? `${PageClass.Usual} ${PageClass.Active}` : classes;

  return {linkPage, classes, textPage};
};


export const getDisplayPages = (pageCount: number, currentPage: number) : number[] => {

  const pages = [
    pageCount > 3 && currentPage === pageCount ? currentPage - 3 : null,
    currentPage - 2 > 0 ? currentPage - 2 : null,
    currentPage - 1 > 0 ? currentPage - 1 : null,
    currentPage,
    currentPage < pageCount ? currentPage + 1: null,
    currentPage < pageCount - 1  ? currentPage + 2:  null,
    pageCount > 3 && currentPage === 1  ? currentPage + 3:  null,
  ];


  const pagesNotNull = pages.filter((item) => item !== null);

  return pagesNotNull as number[];
};
