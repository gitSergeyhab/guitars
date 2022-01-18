import { PopupType } from '../../const';
import { Guitar, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Popup;


export const getGuitarFromPopup = (state: State): Guitar | null => state[field].guitarPopup;
export const getPopupType = (state: State): PopupType | null => state[field].popupType;

