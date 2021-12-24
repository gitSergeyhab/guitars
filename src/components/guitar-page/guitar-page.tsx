import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import BreadcrumbMain from '../breadcrumbs/breadcramb-main/breadcramb-main';
import BreadcrumbCatalog from '../breadcrumbs/breadcramb-catalog/breadcramb-catalog';
import BreadcrumbProduct from '../breadcrumbs/breadcramb-product/breadcramb-product';
import GuitarPageProduct from '../guitar-page-product/guitar-page-product';
import { fetchComments, fetchTheGuitar } from '../../store/api-actions';
import { GuitarPageReviews } from '../guitar-page-reviews/guitar-page-reviews';


// С Л Е Д У Ю Щ И Й   Э Т А П


export default function GuitarPage(): JSX.Element {

  const dispatch = useDispatch();

  const {id}: {id: string} = useParams();

  useEffect(() => {
    dispatch(fetchTheGuitar(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>

        <ul className="breadcrumbs page-content__breadcrumbs">
          <BreadcrumbMain/>
          <BreadcrumbCatalog/>
          <BreadcrumbProduct/>
        </ul>

        <GuitarPageProduct/>
        <GuitarPageReviews/>
      </div>
    </main>
  );
}
