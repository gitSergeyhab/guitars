import { StringPage } from '../const';

export const getPageCount = (guitarsCount: number, limit: number): number => Math.ceil(guitarsCount/limit);

type GetStringPage = {firsPage: string, lastPage: string}
export const getStringPage = (currentPage: number, first: number, last: number): GetStringPage => {

  const firsPage = currentPage - first > 1 ? StringPage.Prev : first;
  const lastPage = last - currentPage > 1 ? StringPage.Next : last;

  return {
    firsPage: firsPage.toString(),
    lastPage: lastPage.toString(),
  };
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
