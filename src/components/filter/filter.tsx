import styled from 'styled-components';
import { titleBigger } from '../_common/common';
import FilterPrice from './filter-price/filter-price';
import FilterString from './filter-string/filter-string';
import FilterType from './filter-type/filter-type';


const CatalogForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-area: filters;`;

const FilterTitle = styled.h2`
  ${titleBigger}
  margin-top: 8px;
  margin-bottom: 22px;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
`;

export default function Filter(): JSX.Element {
  return (
    <CatalogForm>
      <FilterTitle>Фильтр</FilterTitle>

      <FilterPrice/>
      <FilterType/>
      <FilterString/>

    </CatalogForm>
  );
}
