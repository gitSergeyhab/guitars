import { useDispatch, useSelector } from 'react-redux';

import { setCheckedStrings, setCurrentPage } from '../../../store/actions';
import { getActiveStrings, getCheckedStrings } from '../../../store/filter-reducer/filter-reducer-selector';
import { ALL_STRINGS } from '../../../const';


function OneString({stringCount} : {stringCount : number}): JSX.Element {

  const activeStrings = useSelector(getActiveStrings);
  const originCheckedStrings = useSelector(getCheckedStrings);

  const id = `${stringCount}-strings`;

  const isDisabled = activeStrings.every((item) => item !== stringCount) && !!activeStrings.length;
  const isChecked = originCheckedStrings.some((item) => item === stringCount);

  const dispatch = useDispatch();

  const handleStringChange = () => {
    const checkedStrings = [...originCheckedStrings];
    const index = checkedStrings.findIndex((item) => item === stringCount);

    if (index === -1) {
      checkedStrings.push(stringCount);
    } else {
      checkedStrings.splice(index, 1);
    }
    dispatch(setCheckedStrings(checkedStrings));
    dispatch(setCurrentPage(1)); // сбрасывает страницу
  };


  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        onChange={handleStringChange}
        className="visually-hidden" type="checkbox" id={id} name={id}
        disabled={isDisabled} checked={isChecked}
      />
      <label htmlFor={id}>{stringCount}</label>
    </div>
  );
}

export default function FilterString(): JSX.Element {

  const stringFields = ALL_STRINGS.map((item) => <OneString stringCount={item} key={item}/>);
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>

      {stringFields}

    </fieldset>
  );
}
