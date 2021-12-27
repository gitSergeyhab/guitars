import { toast } from 'react-toastify';

import { Comment, Guitar, GuitarWithComments, Order, ThunkActionResult } from '../types/types';
import { loadAllGuitars, loadGuitars, loadSearchGuitars, loadTheGuitar, setAllGuitarsErrorStatus, setCartGuitars, setComments, setCoupon, setDiscount, setGuitarCount, setGuitarsErrorStatus, setGuitarToPopup, setPopupType, setSearchLoadingStatus, setTheGuitarErrorStatus } from './actions';
import { ApiRoute, ParamName, PopupType } from '../const';


const SUCCESS_ORDER_MESSAGE = 'congratulations, the guitar is ordered';
const TOTAL_COUNT = 'x-total-count';

export const enum ErrorMessage {
  FetchGuitars = 'Unable to upload guitars',
  FetchGuitar = 'Unable to upload this guitar',
  FetchComments = 'Unable to upload this comments',
  PostCoupons = 'you did not guess )',
  PostComment = 'unable to send a comment',
  PostOrder = 'it is impossible to order this guitar, try later'
}


// CATALOG

//all guitars
export const fetchAllGuitars = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      dispatch(setAllGuitarsErrorStatus(false));
      const {data} = await api.get<Guitar[]>(ApiRoute.Guitars);
      dispatch(loadAllGuitars(data));
    } catch {
      dispatch(setAllGuitarsErrorStatus(true));
      toast.error(ErrorMessage.FetchGuitars);
    }
  };

// guitars + filter, sort, pagination
export const fetchGuitarsWithPath = ( path: string ): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      dispatch(setGuitarsErrorStatus(false));
      const result = await api.get<GuitarWithComments[]>(
        `${ApiRoute.Guitars}${path}`, {params: {[ParamName.Embed.Embed]: ParamName.Embed.Comment}});
      const {data} = result;
      const totalCount = result.headers[TOTAL_COUNT] as string;
      const guitarCount = totalCount ? +totalCount : data.length;
      dispatch(setGuitarCount(guitarCount));
      dispatch(loadGuitars(data));
    } catch {
      dispatch(setGuitarsErrorStatus(true));
      toast.error(ErrorMessage.FetchGuitars);
    }
  };

// guitars + search
export const fetchGuitarsWithSearch = (search = ''): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    dispatch(setSearchLoadingStatus(true));

    const params = {[ParamName.Search.NameLike] : `^${search}`};
    try {
      const {data} = await api.get<Guitar[]>(ApiRoute.Guitars, {params});
      dispatch(loadSearchGuitars(data));
    } catch (e) {
      toast.error(ErrorMessage.FetchGuitars);
    }

    dispatch(setSearchLoadingStatus(false));
  };


// С Л Е Д У Ю Щ И Й   Э Т А П

// PRODUCT

// Product - get - guitar
export const fetchTheGuitar = (id: string): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      dispatch(setTheGuitarErrorStatus(false));
      const {data} = await api.get<Guitar>(`${ApiRoute.Guitars}/${id}`);
      dispatch(loadTheGuitar(data));
    } catch {
      dispatch(setTheGuitarErrorStatus(true));
      toast.error(ErrorMessage.FetchGuitar);
    }
  };

// product - get - comment
export const fetchComments = (id: string) : ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Comment[]>(`${ApiRoute.Guitars}/${id}/${ApiRoute.Comments}`);
      dispatch(setComments(data));
    } catch {
      toast.error(ErrorMessage.FetchComments);
    }
  };

// product - post - comment
type CommentPost = {guitarId: number, userName: string, advantage: string, disadvantage: string, comment: string, ratting: number}
export const postComment = ({body} : {body : CommentPost}) : ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      await api.post(ApiRoute.Comments, body);
      dispatch(setPopupType(PopupType.SuccessReview));
      dispatch(setGuitarToPopup(null));
    } catch {
      toast.error(ErrorMessage.PostComment);
    }
  };

//CART

// cart - post - coupon
export const postCoupons = (body: {coupon: string}) : ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.post(ApiRoute.Coupons, body);
      dispatch(setDiscount(+data));
      dispatch(setCoupon(body.coupon));
    } catch {
      toast.error(ErrorMessage.PostCoupons);
    }
  };

// cart - post - order
export const postOrder = ({body} : {body : Order}) : ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      await api.post(ApiRoute.Orders, body);
      toast.success(SUCCESS_ORDER_MESSAGE);
      dispatch(setCartGuitars([]));
    } catch {
      toast.error(ErrorMessage.PostOrder);
    }
  };


