import { ALL_STRINGS, GUITARS_PER_PAGE, GuitarType, GUITAR_TYPES, MESSAGE_NO_GUITARS, PageName, ParamName } from '../const';
import { ReducerName } from '../store/root-reducer';
import { makeFakeGuitarList } from './test-mocks';


const fakeGuitarList = makeFakeGuitarList();

const DefaultPrice =  {
  Max: 35000,
  Min: 0,
} as const;

export const FakeAction = {type: 'FAKE_ACTION'} as const;

export const stateFilled = {
  [ReducerName.Main]: {
    guitars: fakeGuitarList,
    isLoading: true,
    isError: false,
    allGuitars: fakeGuitarList,
    allGuitarsLoading: true,
    allGuitarsError: false,
    searchGuitars: fakeGuitarList,
    parseParamsFromUrl: false,
  },

  [ReducerName.Filter]: {
    userMinPice: DefaultPrice.Min,
    userMaxPice: DefaultPrice.Max,
    userType: GUITAR_TYPES,
    stringsActive: ALL_STRINGS,
    stringsChecked: ALL_STRINGS,
  },

  [ReducerName.Pagination]: {
    currentPage: 3,
    start: 5,
    limit: 10,
    guitarCount: 20,
  },

  [ReducerName.Sort]: {
    sort: ParamName.Sort.Price,
    order: ParamName.Sort.Desc,
    isSort: true,
  },
};

export const stateEmpty = {
  [ReducerName.Main]: {
    guitars: [],
    isLoading: true,
    isError: false,
    allGuitars: [],
    allGuitarsLoading: true,
    allGuitarsError: false,
    searchGuitars: [],
    parseParamsFromUrl: true,
  },

  [ReducerName.Filter]: {
    userMinPice: null,
    userMaxPice: null,
    userType: [],
    stringsActive: [],
    stringsChecked: [],
  },

  [ReducerName.Pagination]: {
    currentPage: 1,
    start: 0,
    limit: GUITARS_PER_PAGE,
    guitarCount: 0,
  },

  [ReducerName.Sort]: {
    sort: ParamName.Sort.Origin,
    order: ParamName.Sort.Origin,
    isSort: false,
  },
};


export const ScreenText = {
  Filter: {
    Price: /Цена/i,
    [GuitarType.Acoustic]: new RegExp(GuitarType.Acoustic, 'i'),
    [GuitarType.Electric]: new RegExp(GuitarType.Electric, 'i'),
    [GuitarType.Ukulele]: new RegExp(GuitarType.Ukulele, 'i'),
    Strings: /Количество струн/i,
  },
  Sort: {
    Price: /по цене/i,
    Rating: /по популярности/i,
  },
  Header: {
    Catalog: /Каталог/i,
    Where: /Где купить/i,
    About: /О компании/i,
    PlaceHolder: /что вы ищите/i,
  },
  Breadcrumbs: {
    [PageName.Cart]: new RegExp(PageName.Cart, 'i'),
    [PageName.Catalog]: new RegExp(PageName.Catalog, 'i'),
    [PageName.Contacts]: new RegExp(PageName.Contacts, 'i'),
    [PageName.Info]: new RegExp(PageName.Info, 'i'),
    [PageName.Main]: new RegExp(PageName.Main, 'i'),
    [PageName.Product]: new RegExp(PageName.Product, 'i'),
  },
  Footer: {
    About: /О нас/i,
    Info: /Информация/i,
    Contacts: /Контакты/i,
  },
  Catalog: {
    Filled: {
      Title: /Каталог гитар/i,
      Filter: /Фильтр/i,
      Sort: /Сортировать/i,
    },
    Empty: {
      Status: new RegExp(MESSAGE_NO_GUITARS, 'i'),
    },
  },
  Card: {
    Info: /Подробнее/i,
    Buy: /Купить/i,
  },
};

