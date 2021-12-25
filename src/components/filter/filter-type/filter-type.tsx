import { useDispatch, useSelector } from 'react-redux';

import { setCheckedStrings, setCurrentPage, setUserTypes } from '../../../store/actions';
import { getUserTypes } from '../../../store/filter-reducer/filter-reducer-selector';
import { GuitarInfo, GuitarType, GUITAR_TYPES } from '../../../const';


function FilterOneType({type}: {type: GuitarType}): JSX.Element {

  const originTypes = useSelector(getUserTypes);

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

    dispatch(setUserTypes(types));
    dispatch(setCheckedStrings([])); // сбрасывает выделенные сируны
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
