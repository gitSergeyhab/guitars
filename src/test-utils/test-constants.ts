import { ALL_STRINGS, GUITARS_PER_PAGE, GUITAR_TYPES, MESSAGE_NO_GUITARS, PageName, ParamName } from '../const';
import { ReducerName } from '../store/root-reducer';
import { State } from '../types/types';
import { makeFakeCommentList, makeFakeGuitar, makeFakeGuitarList } from './test-mocks';


export const DefaultPrice =  {
  Max: 35000,
  Min: 1000,
} as const;

export const fakeAction = {type: 'FAKE_ACTION'};


const fakeGuitars = makeFakeGuitarList();
const fakeGuitar = makeFakeGuitar();

const fakeComments = makeFakeCommentList(1);

// это не перечисление - это просто объект, из которого собирается стейт для тестов
export const stateFilled: State = {
  [ReducerName.Cart]: {
    cartGuitars: [{guitar: fakeGuitar, count: 2}],
    discount: 15,
    coupon: 'light-333',
    guitarPopup: fakeGuitar,
    popupType: null,
  },

  [ReducerName.Guitar]: {
    guitar: fakeGuitar,
    isLoading: false,
    isError: false,
    comments: fakeComments,
  },

  [ReducerName.Main]: {
    guitars: fakeGuitars,
    isLoading: false,
    isError: false,
    allGuitars: fakeGuitars,
    allGuitarsLoading: false,
    allGuitarsError: false,
    searchGuitars: fakeGuitars,
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
    currentPage: 1,
    start: 0,
    limit: 5,
    guitarCount: 20,
  },

  [ReducerName.Sort]: {
    sort: ParamName.Sort.Price,
    order: ParamName.Sort.Desc,
    isSort: true,
  },
};

export const stateEmpty: State = {
  [ReducerName.Cart]: {
    cartGuitars: [],
    discount: 0,
    coupon: '',
    guitarPopup: null,
    popupType: null,
  },

  [ReducerName.Guitar]: {
    guitar: null,
    isLoading: false,
    isError: false,
    comments: [],
  },
  [ReducerName.Main]: {
    guitars: [],
    isLoading: false,
    isError: false,
    allGuitars: [],
    allGuitarsLoading: false,
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
    Electric: /Электрогитары/i,
    Price: /Цена/i,
    Strings: /Количество струн/i,
    Label: /Минимальная цена/i,
  },
  Sort: {
    Price: /по цене/i,
    Rating: /по популярности/i,
    LabelUp: /По возрастанию/i,
    LabelDown: /По убыванию/i,
  },
  Header: {
    Catalog: /Каталог/i,
    Where: /Где купить/i,
    About: /О компании/i,
    PlaceHolder: /что вы ищите/i,
  },
  Breadcrumbs: {
    Cart: new RegExp(PageName.Cart, 'i'),
    Catalog: new RegExp(PageName.Catalog, 'i'),
    Contacts: new RegExp(PageName.Contacts, 'i'),
    Info: new RegExp(PageName.Info, 'i'),
    Main: new RegExp(PageName.Main, 'i'),
    Product: new RegExp(PageName.Product, 'i'),
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
  Product: {
    Product: /Товар/i,
    Characteristic: /Характеристики/i,
    Description: /Описание/i,
  },
  Cart: {
    Cart: /Корзина/i,
    Empty: RegExp(MESSAGE_NO_GUITARS, 'i'),
    Filled: {
      PromoCode: /Промокод на скидку/i,
      PriceAll: /Всего/i,
    },
  },
  Card: {
    Info: /Подробнее/i,
    Buy: /Купить/i,
  },
  NotFound: {
    Error404: /Error 404/i,
    PageNotFound: /Page Not Found/i,
  },
  Loading: /Loading/i,
  Logo: /Логотип/i,
};


export const TestPageText = {
  Main: 'Main Page Test Text',
  Catalog: 'Catalog Page Test Text',
  Cart: 'Cart Page Test Text',
  Guitars: 'Guitars Page Test Text',
  NotFoundPage: 'NotFoundPage Page Test Text',
} as const;
