import { SET_CLASSES, SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';


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
  //dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("new class structure", newClass);
  axios.post('/addClass', newClass).then((res) => {
    console.log(res.data);
    dispatch({
      type: SET_CLASSES,
      payload: newClass
    })
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