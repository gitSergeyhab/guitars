import { useDispatch, useSelector } from 'react-redux';

import { setCheckedStrings, setCurrentPage, setUserTypes } from '../../../store/actions';
import { getCheckedStrings, getUserTypes } from '../../../store/filter-reducer/filter-reducer-selector';
import { ALL_STRINGS, GuitarInfo, GuitarType, GUITAR_TYPES } from '../../../const';
import { getStringsCount } from '../../../utils/utils';


function FilterOneType({type}: {type: GuitarType}): JSX.Element {

  const originTypes = useSelector(getUserTypes);
  const checkedStrings = useSelector(getCheckedStrings);

  const isChecked = originTypes.some((item) => item === type);

  const dispatch = useDispatch();

  const handleTypeChange = () => {
    const types = [...originTypes];
    const index = types.findIndex((item) => item === type);


    if (index === -1) {
      types.push(type);
    } else {
      types.splice(index, 1);
    }

    const stringsFromTypes = getStringsCount(types as GuitarType[]);
    const strings = stringsFromTypes.length ? stringsFromTypes : ALL_STRINGS;
    const newCheckedStrings = checkedStrings.filter((checkedString) => strings.some((string) => string === checkedString));
    dispatch(setCheckedStrings(newCheckedStrings));
    dispatch(setUserTypes(types));
    dispatch(setCurrentPage(1)); // сбрасывает страницу
  };

  const {name} = GuitarInfo[type];
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        data-testid={`type-${type}`}
        className="visually-hidden" type="checkbox"
        id={type} name={type}
        onChange={handleTypeChange}
        checked={isChecked}
      />
      <label htmlFor={type}>{name}</label>
    </div>
  );
}


export default function FilterType(): JSX.Element {

  const types = GUITAR_TYPES.map((item) => <FilterOneType type={item} key={item} />);

  return (
    <fieldset className="catalog-filter__block">

      {types}

    </fieldset>
  );
}
