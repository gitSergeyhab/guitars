import { CartGuitar, Guitar, Order } from '../types/types';
import { GuitarInfo, GuitarType } from '../const';


export const getMinMaxPrice = (guitars: Guitar[]): {min: number, max: number} => {

  const prices = guitars.map((guitar) => guitar.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return { min, max };
};


export const getStringsCount = (types: GuitarType[]): number[] => {
  const stringsArray = types.map((type) => GuitarInfo[type].strings);
  const strings = stringsArray.reduce((acc, elem) => [...acc, ...elem] , []);
  return [...Array.from(new Set(strings))];
};


export const getTruePath = (str: string): {src: string, srcSet: string} => {
  const noJpg = str.split('.')[0];
  const number = noJpg.split('-')[1];
  return {
    src: `/img/content/catalog-product-${number}.jpg`,
    srcSet: `/img/content/catalog-product-${number}@2x.jpg 2x`,
  };
};


export const getReviewDate = (date: string): string => new Date(date).toLocaleString('ru', {month: 'long',  day: '2-digit'});

export const changeGuitarInCart = (guitar: Guitar, cartGuitars: CartGuitar[], plus: boolean) : CartGuitar[] => {
  const index = cartGuitars.findIndex((cartGuitar) => cartGuitar.guitar.vendorCode === guitar.vendorCode);

  if (index === -1 && plus) {
    cartGuitars = [...cartGuitars, { guitar, count: 1} ];
    return cartGuitars;
  }

  if (!plus && index !== -1 && cartGuitars[index].count === 1) {
    cartGuitars.splice(index, 1);
    return cartGuitars;
  }

  if (index !== -1) {
    if (plus) {
      cartGuitars[index] = {...cartGuitars[index], count: cartGuitars[index].count + 1 };
    } else {
      cartGuitars[index] = {...cartGuitars[index], count: cartGuitars[index].count - 1 };
    }
  }
  return cartGuitars;
};


export const getFullPrice = (cartGuitars: CartGuitar[]): number => cartGuitars.reduce((acc, item) => acc + item.count * item.guitar.price , 0);


const getGuitarUds = (cartGuitars: CartGuitar[]): number[] => {
  const idArrays = cartGuitars.map((guitar) => new Array(guitar.count).fill(null).map(() => guitar.guitar.id));
  return idArrays.reduce((acc, item) => [...acc, ...item] , []);
};

export const getOrder = (cartGuitars: CartGuitar[], coupon: string): Order => ({guitarsIds: getGuitarUds(cartGuitars), coupon});

export const makeStringPrice = (price : number): string => {
  const stringPrice = price.toString();
  const length = stringPrice.length;
  if (length > 3) {
    return `${stringPrice.slice(0, length - 3)} ${stringPrice.slice(length - 3)}`;
  }
  return stringPrice;
};
