import { Route, Switch } from 'react-router-dom';

import CartPage from '../cart/cart';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import GuitarPage from '../guitar-page/guitar-page';
import Header from '../header/header';
import Main from '../main/main';
import Modal from '../modals/modal';
import NotFoundPage from '../not-found-page/not-found-page';
import { APPRoute } from '../../const';


export default function App(): JSX.Element {

  return (
    <>
      <Header/>
      <Switch>
        <Route exact path={APPRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={APPRoute.Catalog}>
          <Catalog/>
        </Route>
        <Route exact path={APPRoute.Guitars}>
          <GuitarPage/>
        </Route>
        <Route exact path={APPRoute.Cart}>
          <CartPage/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
      <Footer/>
      <Modal/>
    </>
  );
}

