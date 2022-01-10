import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';
import { createAPI } from './services/api';
import { rootReducer } from './store/root-reducer';
import { fetchExtremePrices } from './store/api-actions';

import 'react-toastify/dist/ReactToastify.css';
import { getCartGuitarsFromStorage } from './utils/cart-storage-utils';
import { setCartGuitars } from './store/actions';


const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

store.dispatch(fetchExtremePrices());
const cartGuitars = getCartGuitarsFromStorage();
store.dispatch(setCartGuitars(cartGuitars));


ReactDOM.render(
  <React.StrictMode>
    <ToastContainer/>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);


