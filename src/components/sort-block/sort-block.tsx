import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { DEFAULT_PAGE_FOR_PUSH, ParamName } from '../../const';
import { checkSort, getSortAndOrder, makeNewSearch } from '../../utils/param-utils';

const activeSortBtnCss = css`
color: #000000;
pointer-events: none;`;

const activeOrderBtnCss = css`
border-top-color: #131212;
pointer-events: none;`;

// catalog-sort__order-button

const SortOrderButton = styled.button.attrs({ type: 'button' })`
position: relative;

  width: 0;
  height: 0;
  padding: 0;

  border-width: 12px 7px 0;
  border-color: transparent;
  border-top-color: #585757;
  background-color: transparent;

  cursor: pointer;
  -webkit-transition: border-top-color 0.3s ease, outline-color 0.3s ease;
          transition: border-top-color 0.3s ease, outline-color 0.3s ease;

  &::before {
    top: 50%;
    left: 50%;
    position: absolute;

    width: 30px;
    height: 30px;

    content: "";
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }
  &:hover {
    border-top-color: #c90606;
  }
  &:focus {
    outline: 1px solid #c90606;
    outline-offset: 1px;
  }
  ${({ $isActive } : { $isActive: boolean }) => $isActive ? activeOrderBtnCss : ''}
  `;

const SortOrderButtonUp = styled(SortOrderButton)`
border-width: 0 7px 12px;
border-top-color: transparent;
border-bottom-color: #585757;
&::before {
  -webkit-transform: translate(-50%, -25%);
          transform: translate(-50%, -25%);
}
`;

const SortOrderButtonDown = styled(SortOrderButton)`
margin-left: 23px;
&::before {
  -webkit-transform: translate(-50%, -75%);
          transform: translate(-50%, -75%);
}
`;

const SortTypeButton = styled.button.attrs({ type: 'button' })`
padding: 0;

border: none;
background-color: rgba(255, 255, 255, 0);

cursor: pointer;
-webkit-transition: color 0.3s ease, outline-color 0.3s ease;
        transition: color 0.3s ease, outline-color 0.3s ease;
letter-spacing: 0.05em;
&:not(:last-child) {
  margin-right: 30px;
}
&:hover {
  color: #c90606;
}
&:focus {
  outline: 1px solid #c90606;
  outline-offset: 1px;
}
${({ $isActive=false } : { $isActive?: boolean }) => $isActive ? activeSortBtnCss : '' }
`;

const SortTypesWrapper = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #585757;
`;

const SortOrderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 9px;
  margin-left: auto;`;

const SortTitle = styled.h2`
  margin: 0 20px 0 0;
  font: inherit;
  color: #000000;`;

const SortContainer = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
padding-top: 3px;
font-size: 16px;
line-height: 20px;
letter-spacing: 0.05em;
grid-area: sorter;`;

const styleGrayText = { color: '#585757' };


export default function SortBlock(): JSX.Element {

  const { push } = useHistory();
  const { search } = useLocation();

  const isSort = checkSort(search);

  const pushByClick = (param: string, value: string, secondParam: string, secondValue: string) => {
    let newSearch = makeNewSearch(search, param, value);
    if (!isSort) {
      newSearch = makeNewSearch(newSearch, secondParam, secondValue);
    }
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, DEFAULT_PAGE_FOR_PUSH);
    push(newSearch);
  };

  const handlePriceClick = () =>
    pushByClick(ParamName.Sort.Sort, ParamName.Sort.Price, ParamName.Sort.Order, ParamName.Sort.Asc);

  const handleRatingClick = () =>
    pushByClick(ParamName.Sort.Sort, ParamName.Sort.Rating, ParamName.Sort.Order, ParamName.Sort.Asc);

  const handleAscClick = () =>
    pushByClick(ParamName.Sort.Order, ParamName.Sort.Asc, ParamName.Sort.Sort, ParamName.Sort.Price);

  const handleDescClick = () =>
    pushByClick(ParamName.Sort.Order, ParamName.Sort.Desc, ParamName.Sort.Sort, ParamName.Sort.Price);


  const {sort, order} = getSortAndOrder(search);

  return (
    <SortContainer>
      <SortTitle>Сортировать:</SortTitle>
      <SortTypesWrapper>

        <SortTypeButton
          onClick={handlePriceClick}
          style={sort === ParamName.Sort.Price ? {} : styleGrayText}
          $isActive={sort === ParamName.Sort.Price}
          aria-label="по цене" tabIndex={ sort === ParamName.Sort.Price ? -1 : 0}
        >по цене
        </SortTypeButton>

        <SortTypeButton
          onClick={handleRatingClick}
          style={sort === ParamName.Sort.Rating ? {} : styleGrayText}
          $isActive={sort === ParamName.Sort.Rating}
          aria-label="по цене" tabIndex={ sort === ParamName.Sort.Rating ? -1 : 0}
        >по популярности
        </SortTypeButton>

      </SortTypesWrapper>
      <SortOrderWrapper>

        <SortOrderButtonUp
          onClick={handleAscClick}
          $isActive={order === ParamName.Sort.Asc}
          aria-label="По возрастанию"  tabIndex={ order === ParamName.Sort.Asc ? -1 : 0}
        >
        </SortOrderButtonUp>

        <SortOrderButtonDown
          onClick={handleDescClick}
          $isActive={order === ParamName.Sort.Desc}

          aria-label="По убыванию" tabIndex={ order === ParamName.Sort.Desc ? -1 : 0}
        >
        </SortOrderButtonDown>

      </SortOrderWrapper>
    </SortContainer>
  );
}
