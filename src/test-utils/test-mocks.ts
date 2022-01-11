import { internet, commerce, datatype, image, date } from 'faker';
import { ALL_STRINGS, GUITAR_TYPES } from '../const';
import { Comment, Guitar, GuitarWithComments} from '../types/types';

const MAX_RARING = 5;
const MAX_GUITARS = 5;
const COMMENTS_COUNT = 5;


const getRandomStringCount = (): number => ALL_STRINGS[Math.floor(Math.random()*ALL_STRINGS.length)];
const getRandomGuitarType = (): string => GUITAR_TYPES[Math.floor(Math.random()*GUITAR_TYPES.length)];


export const makeFakeComment = (guitarId: number): Comment => ({
  id: datatype.string(),
  advantage: commerce.productAdjective(),
  comment: commerce.productDescription(),
  createAt: date.past().toISOString(),
  disadvantage: commerce.productMaterial(),
  guitarId,
  rating: datatype.float({min: 1, max: 5}),
  userName: internet.userName(),
});

export const makeFakeGuitar = (): Guitar => {
  const id =  datatype.number();
  return {
    id,
    name: commerce.productName(),
    description: commerce.productDescription(),
    previewImg: image.imageUrl(),
    price: +commerce.price(),
    rating: datatype.number({min: 1, max: MAX_RARING}),
    stringCount: getRandomStringCount(),
    type: getRandomGuitarType(),
    vendorCode: commerce.product(),
  };
};

export const makeFakeGuitarWithComment = (): GuitarWithComments => {
  const guitar = makeFakeGuitar();
  return {...guitar, comments: makeFakeCommentList(guitar.id) };
};


export const makeFakeGuitarList = () => new Array(datatype.number({min: 1, max: MAX_GUITARS})).fill(null).map(() => makeFakeGuitarWithComment());
export const makeFakeCommentList = (guitarId: number) => new Array(COMMENTS_COUNT).fill(null).map(() => makeFakeComment(guitarId));
