import { cartReducer } from './cart-reducer';
import { setCartGuitars, setCoupon, setCouponValidStatus, setDiscount } from '../actions';
import { fakeAction, stateEmpty, stateFilled } from '../../test-utils/test-constants';


const testData = {...stateFilled.Cart};
const initialState = {...stateEmpty.Cart};


describe('Reducer : cartReducer', () => {
  let state = {...initialState};
  beforeEach (() => state = {...initialState});

  it('without additional parameters should return initial state', () => {
    expect(cartReducer(undefined, fakeAction)).toEqual(initialState);
  });

  it('should update cartGuitars by setCartGuitars', () => {
    const expectedState = {...state, cartGuitars: testData.cartGuitars};
    expect(cartReducer(state, setCartGuitars(testData.cartGuitars))).toEqual(expectedState);
  });

  it('should update discount by setDiscount', () => {
    const expectedState = {...state, discount: testData.discount};
    expect(cartReducer(state, setDiscount(testData.discount))).toEqual(expectedState);
  });

  it('should update coupon by setCoupon', () => {
    const expectedState = {...state, coupon: testData.coupon};
    expect(cartReducer(state, setCoupon(testData.coupon))).toEqual(expectedState);
  });

  it('should update isCouponValid by setCouponValidStatus', () => {
    const expectedState = {...state, isCouponValid: testData.isCouponValid};
    expect(cartReducer(state, setCouponValidStatus(testData.isCouponValid))).toEqual(expectedState);
  });
});
