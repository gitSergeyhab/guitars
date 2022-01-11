import { MAX_RATING } from '../../const';

function Star({height, width} : {height: string, width: string}): JSX.Element {
  return (
    <svg width={width} height={height} aria-hidden="true" data-testid="star">
      <use xlinkHref="#icon-star"></use>
    </svg>
  );
}

function FullStar({height, width} : {height: string, width: string}): JSX.Element {
  return (
    <svg width={width} height={height} aria-hidden="true" data-testid="full-star">
      <use xlinkHref="#icon-full-star"></use>
    </svg>
  );
}


type RatingArgs = {rating: number, height: string, width: string}
export default function Rating({rating, height, width} : RatingArgs): JSX.Element {

  const fullCount = Math.round(rating);
  const emptyCount = MAX_RATING - fullCount;

  const fullStars = new Array(fullCount).fill(null).map((_, i) => i).map((i) => <FullStar key={i} width={width} height={height}/>);
  const emptyStars = new Array(emptyCount).fill(null).map((_, i) => i).map((i) => <Star key={i} width={width} height={height}/>);

  return (
    <>
      {fullStars}
      {emptyStars}
    </>
  );
}
