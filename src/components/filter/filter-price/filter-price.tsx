import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage, setUserMaxPrice, setUserMinPrice } from '../../../store/actions';
import { getMaxPrice, getMinPrice, getUserMaxPrice, getUserMinPrice } from '../../../store/filter-reducer/filter-reducer-selector';


export default function FilterPrice(): JSX.Element {

  const minCatalogPrice = useSelector(getMinPrice);
  const maxCatalogPrice = useSelector(getMaxPrice);


  // const {min, max} = useSelector(getPricesFromCatalog);
  const dispatch = useDispatch();

  const minPrice = useSelector(getUserMinPrice);
  const maxPrice = useSelector(getUserMaxPrice);

  const handleMinPriceBlur = () => {
    if (minPrice !== null && minCatalogPrice !==null && minPrice < minCatalogPrice) {
      dispatch(setUserMinPrice(minCatalogPrice));
    } else if (minPrice !== null && maxCatalogPrice !==null && minPrice > maxCatalogPrice) {
      dispatch(setUserMinPrice(maxCatalogPrice));
    } else {
      dispatch(setUserMinPrice(minPrice));
    }
  };

  const handleMaxPriceBlur = () => {
    if (maxPrice !== null && minCatalogPrice !==null && maxPrice < minCatalogPrice) {
      dispatch(setUserMaxPrice(minCatalogPrice));
    } else if (maxPrice !== null && maxCatalogPrice !==null && maxPrice > maxCatalogPrice) {
      dispatch(setUserMaxPrice(maxCatalogPrice));
    } else {
      dispatch(setUserMaxPrice(maxPrice));
    }
  };

  const handleMinPriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    dispatch(setUserMinPrice(+value));
    dispatch(setCurrentPage(1)); // сбрасывает страницу
  };

  const handleMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    dispatch(setUserMaxPrice(+value));
    dispatch(setCurrentPage(1));
  };

  const minPriceAttribute = minCatalogPrice ? minCatalogPrice : '';
  const maxPriceAttribute = maxCatalogPrice ? maxCatalogPrice : '';


  return (

    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            data-testid='priceMin'
            type="number" id="priceMin" name="от"
            placeholder={`${minPriceAttribute}`} min={minPriceAttribute} max={maxPriceAttribute}
            onBlur={handleMinPriceBlur} value={`${minPrice}`} onChange={handleMinPriceChange}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            data-testid='priceMax'
            type="number" id="priceMax" name="до"
            placeholder={`${maxPriceAttribute}`} min={minPriceAttribute} max={maxPriceAttribute}
            onBlur={handleMaxPriceBlur} value={`${maxPrice}`} onChange={handleMaxPriceChange}
          />
        </div>
      </div>
    </fieldset>
  );
}


// export default function FilterPrice(): JSX.Element {

//   const {min, max} = useSelector(getPricesFromCatalog);
//   const dispatch = useDispatch();

//   const minPrice = useSelector(getUserMinPrice);
//   const maxPrice = useSelector(getUserMaxPrice);
//   //
//   const [minPriceValue, setMinPriceValue] = useState(minPrice);
//   const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);

//   const debouncedMinPrice = useDebounce(minPriceValue);
//   const debouncedMaxPrice = useDebounce(maxPriceValue);


//   useEffect(() => {
//     dispatch(setUserMinPrice(debouncedMinPrice));
//   }, [dispatch, debouncedMinPrice]);


//   useEffect(() => {
//     dispatch(setUserMaxPrice(debouncedMaxPrice));
//   }, [dispatch, debouncedMaxPrice]);

//   const handleMinPriceBlur = () => {
//     if (minPriceValue !== null && minPriceValue < min) {
//       setMinPriceValue(min);
//     } else if (minPriceValue !== null && minPriceValue > max) {
//       setMinPriceValue(max);
//     } else {
//       setMinPriceValue(minPriceValue);
//     }
//   };

//   const handleMaxPriceBlur = () => {
//     if (maxPriceValue !== null && maxPriceValue < min) {
//       setMaxPriceValue(min);
//     } else if (maxPriceValue !== null && maxPriceValue > max) {
//       setMaxPriceValue(max);
//     } else {
//       setMaxPriceValue(maxPriceValue);
//     }
//   };

//   const handleMinPriceChange = (evt: FormEvent<HTMLInputElement>) => {
//     const value = evt.currentTarget.value;
//     setMinPriceValue(+value);
//     dispatch(setCurrentPage(1));
//   };

//   const handleMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => {
//     const value = evt.currentTarget.value;
//     setMaxPriceValue(+value);
//     dispatch(setCurrentPage(1));
//   };

//   return (

//     <fieldset className="catalog-filter__block">
//       <legend className="catalog-filter__block-title">Цена, ₽</legend>
//       <div className="catalog-filter__price-range">
//         <div className="form-input">
//           <label className="visually-hidden">Минимальная цена</label>
//           <input
//             data-testid='priceMin'
//             type="number" id="priceMin" name="от"
//             placeholder={`${min}`} min={min} max={max}
//             value={`${minPriceValue}`}
//             onBlur={handleMinPriceBlur}
//             onChange={handleMinPriceChange}
//           />
//         </div>
//         <div className="form-input">
//           <label className="visually-hidden">Максимальная цена</label>
//           <input
//             data-testid='priceMax'
//             type="number" id="priceMax" name="до"
//             placeholder={`${max}`} min={min} max={max}
//             value={`${maxPriceValue}`}
//             onBlur={handleMaxPriceBlur}
//             onChange={handleMaxPriceChange}
//           />
//         </div>
//       </div>
//     </fieldset>
//   );
// }
