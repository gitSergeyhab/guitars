
import { useHistory, useLocation } from 'react-router-dom';

import { getStringCountFromUrl, getTypesFromUrl, makeNewSearch } from '../../../utils/param-utils';
import { getStringsCount } from '../../../utils/utils';
import { ALL_STRINGS, DEFAULT_PAGE_FOR_PUSH, GuitarType, ParamName } from '../../../const';
import { CheckBoxInput, FilterFieldset, FilterLegend, FormCheckBoxItem } from '../../_common/common';


function OneString({stringCount} : {stringCount : number}): JSX.Element {

  const {search} = useLocation();
  const {push} = useHistory();

  const originTypes = getTypesFromUrl(search);
  const activeStrings = getStringsCount(originTypes as GuitarType[]);
  const originCheckedStrings = getStringCountFromUrl(search);

  const id = `${stringCount}-strings`;

  const isDisabled = activeStrings.every((item) => item !== stringCount) && !!activeStrings.length;
  const isChecked = originCheckedStrings.some((item) => item === stringCount);

  const handleStringChange = () => {
    const checkedStrings = [...originCheckedStrings];
    const index = checkedStrings.findIndex((item) => item === stringCount);

    if (index === -1) {
      checkedStrings.push(stringCount);
    } else {
      checkedStrings.splice(index, 1);
    }

    let newSearch = makeNewSearch(search, ParamName.Filter.StringCount, checkedStrings);
    newSearch = makeNewSearch(newSearch, ParamName.Range.Page, DEFAULT_PAGE_FOR_PUSH);
    push(newSearch);
  };


  return (
    <FormCheckBoxItem>
      <CheckBoxInput
        onChange={handleStringChange}
        id={id} name={id}
        disabled={isDisabled} checked={isChecked}
      />
      <label htmlFor={id}>{stringCount}</label>
    </FormCheckBoxItem>
  );
}

export default function FilterString(): JSX.Element {

  const stringFields = ALL_STRINGS.map((item) => <OneString stringCount={item} key={item}/>);
  return (
    <FilterFieldset>
      <FilterLegend>Количество струн</FilterLegend>
      {stringFields}
    </FilterFieldset>
  );
}
