import { SET_CLASSES, SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const clearErrors = () => (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS
    });
}
