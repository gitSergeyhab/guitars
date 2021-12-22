import { useDispatch, useSelector } from 'react-redux';

import { setCheckedStrings, setCurrentPage, setUserTypes } from '../../../store/actions';
import { getUserTypes } from '../../../store/filter-reducer/filter-reducer-selector';
import { GuitarInfo, GuitarType } from '../../../const';


function FilterOneType({type}: {type: GuitarType}): JSX.Element {

  const typeListOrigin = useSelector(getUserTypes);

  const isChecked = typeListOrigin.some((item) => item === type);

  const dispatch = useDispatch();

  const handleTypeChange = () => {
    const typeList = [...typeListOrigin];
    const index = typeList.findIndex((item) => item === type);

    if (index === -1) {
      typeList.push(type);
    } else {
      typeList.splice(index, 1);
    }

    dispatch(setUserTypes(typeList));
    dispatch(setCheckedStrings([])); // сбрасывает выделенные сируны
    dispatch(setCurrentPage(1)); // сбрасывает страницу
  };

  const {name} = GuitarInfo[type];
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
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
  const typeList = [GuitarType.Acoustic, GuitarType.Electric, GuitarType.Ukulele];
  const types = typeList.map((item) => <FilterOneType type={item} key={item} />);
  return (
    <fieldset className="catalog-filter__block">

      {types}

    </fieldset>
  );
}
