
export const ESCAPE = 'Escape';

export const SELECTOR_MODAL = '.modal__content';

export const MESSAGE_NO_GUITARS = 'Ты угадал! Именно таких гитар у нас нет...';


export const GUITARS_PER_PAGE = 9;

export const ALL_STRINGS = [4, 6, 7, 12] as const;


export const enum APPRoute {
  Main = '/',
  Catalog = '/',
  Guitars = '/guitars/:id',
  Cart = '/cart',
  Contacts = 'Contacts',
  Info = 'Info',
}


export const enum ApiRoute {
  Guitars = 'guitars',
  Comments = 'comments',
  Coupons = 'coupons',
  Orders = 'orders',
}

export const enum GuitarType {
  Electric = 'electric',
  Ukulele = 'ukulele',
  Acoustic = 'acoustic',
}

export const GUITAR_TYPES = [GuitarType.Acoustic, GuitarType.Electric, GuitarType.Ukulele] as const;


export const GuitarInfo = {
  [GuitarType.Electric] : {name: 'Электрогитары', nameOne: 'Электрогитара', strings: [4, 6, 7]},
  [GuitarType.Ukulele] : {name: 'Укулеле', nameOne: 'Укулеле',strings: [4]},
  [GuitarType.Acoustic] : {name: 'Акустические гитары', nameOne: 'Акустическиая гитара',strings: [6, 7, 12 ]},
} as const;

export const ParamName = {
  Filter: {
    type: 'type',
    PriceLte: 'price_lte',
    PriceGte: 'price_gte',
    StringCount: 'stringCount',
  },
  Sort: {
    Sort: '_sort',
    Price: 'price',
    Rating: 'rating',
    Order: '_order',
    Desc: 'desc',
    Asc: 'asc',
    Origin: 'Origin',
  },
  Range: {
    Start: '_start',
    End: '_end',
    Limit: '_limit',
  },
  Search: {
    NameLike: 'name_like',
  },
  Embed: {
    Embed: '_embed',
    Comment: 'comments',
  },
} as const;

export const enum PopupType {
  CartAdd = 'CartAdd',
  CartDelete = 'CartDelete',
  Review = 'Review',
  SuccessAddToCard = 'SuccessAddToCard',
  SuccessReview = 'SuccessReview',
}

export const enum StringPage {
  Prev = 'Назад',
  Next = 'Далее',
}

export const enum PageName {
  Main = 'Главная',
  Catalog = 'Каталог',
  Product = 'Товар',
  Cart = 'Корзина',
  Contacts = 'Где купить',
  Info = 'О компании',
}
