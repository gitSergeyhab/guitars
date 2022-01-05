import { ReducerName } from '../store/root-reducer';
import { State } from '../types/types';
import { makeFakeCommentList, makeFakeGuitar, makeFakeGuitarList } from './test-mocks';
import { EMPTY_CART_TEXT, MESSAGE_NO_GUITARS, PageName } from '../const';


export const DefaultPrice =  {
  Max: 35000,
  Min: 1000,
} as const;

export const fakeAction = {type: 'FAKE_ACTION'};


const fakeGuitars = makeFakeGuitarList();
const fakeGuitar = makeFakeGuitar();
const fakeComments = makeFakeCommentList(1);

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

  [ReducerName.Catalog]: {
    guitars: fakeGuitars,
    isLoading: false,
    isError: false,
    searchGuitars: fakeGuitars,
    searchLoading: false,
    minPrice: DefaultPrice.Min,
    maxPrice: DefaultPrice.Max,
    guitarCount: 20,
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
  [ReducerName.Catalog]: {
    guitars: [],
    isLoading: false,
    isError: false,
    searchGuitars: [],
    searchLoading: false,
    minPrice: null,
    maxPrice: null,
    guitarCount: 0,
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
    Empty: RegExp(EMPTY_CART_TEXT, 'i'),
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
  Modal: {
    CartAdd: {
      Title: /Добавить товар в корзину/i,
      Btn: /Добавить в корзину/i,
    },
    CardDelete: {
      Title: /Удалить этот товар/i,
      BtnDelete: /Удалить товар/i,
      BtnCancel: /Продолжить покупки/i,
    },
    Review: {
      Title: /Оставить отзыв/i,
      Send: /Отправить отзыв/i,
    },
    SuccessAdd: {
      Title: /Товар успешно добавлен в корзину/i,
      BtnToCart: /Перейти в корзину/i,
      BtnCancel: /Продолжить покупки/i,
    },
    SuccessReview: {
      Title: /Спасибо за ваш отзыв!/i,
      Continue: /К покупкам/i,
    },
    Label: {
      Close: /Закрыть/i,
    },
  },
};


export const TestPageText = {
  Main: 'Main Page Test Text',
  Catalog: 'Catalog Page Test Text',
  Cart: 'Cart Page Test Text',
  Guitars: 'Guitars Page Test Text',
  NotFoundPage: 'NotFoundPage Page Test Text',
} as const;
