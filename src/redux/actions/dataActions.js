import { SET_CLASSES, SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData).then((res) => {
    console.log(res.data);
    setAuthorizationHeader(res.data.token);
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');

  }).catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });

}

export const getClasses = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
    axios.get('/getclasses').then(res => {
      console.log(res.data.classes)
      dispatch({
        type: SET_CLASSES,
        payload: res.data.classes
      });
        }).catch((err) => {
      dispatch({
        type: SET_CLASSES,
        payload: []
      });
    });
}
export const addClass = (newClass) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("new class structure", newClass);
  axios.post('/addClass', newClass).then((res) => {
    console.log(res.data);
    dispatch({ type: CLEAR_ERRORS });

  }).catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });

}


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}