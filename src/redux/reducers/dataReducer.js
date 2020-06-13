import { SET_CLASSES, SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';


const initialState = {
  classesArray: [],
  loading: false,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
       return {
        ...state,
        loading: true
      };
    case SET_CLASSES:
      return {
        ...state,
        classesArray: action.payload,
        loading: false
      };
    default:
      return state;
  }
}