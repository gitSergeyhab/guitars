import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import GuitarPageProduct from '../guitar-page-product/guitar-page-product';
import { fetchComments, fetchTheGuitar } from '../../store/api-actions';
import { GuitarPageReviews } from '../guitar-page-reviews/guitar-page-reviews';
import { getGuitarErrorStatus, getGuitarLoadingStatus, getTheGuitar } from '../../store/guitar-reducer/guitar-reducer-selectors';
import Spinner from '../spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import Breadcrumb from '../breadcrumbs/breadcrumb';
import { APPRoute } from '../../const';
import { BreadcrumbsList, Main, PageContainer, TitleBiggerPC } from '../_common/common';


export default function GuitarPage(): JSX.Element {

  const guitar = useSelector(getTheGuitar);
  const isError = useSelector(getGuitarErrorStatus);
  const isLoading = useSelector(getGuitarLoadingStatus);

  const dispatch = useDispatch();

  const {id}: {id: string} = useParams();

  useEffect(() => {
    dispatch(fetchTheGuitar(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);


  if (isLoading ) {
    return <Spinner/>;
  }

  if (isError || !guitar) {
    return <NotFoundPage/>;
  }

  return (
    <Main>
      <PageContainer>
        <TitleBiggerPC>Товар</TitleBiggerPC>

        <BreadcrumbsList>
          <Breadcrumb type={APPRoute.Main}/>
          <Breadcrumb type={APPRoute.Catalog}/>
          <Breadcrumb type={APPRoute.Guitars} name={guitar.name} />
        </BreadcrumbsList>

        <GuitarPageProduct guitar={guitar}/>
        <GuitarPageReviews/>
      </PageContainer>
    </Main>
  );
}
