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
export const addClass = (newClass, closeCreateClass, getNewClassInfo) => (dispatch) => {
  //dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("new class structure", newClass);
  axios.post('/addClass', newClass).then((res) => {
    console.log(res.data);
    getNewClassInfo(newClass);
    closeCreateClass(); 
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
export const deleteClass = (body) => (dispatch) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
    axios.delete('/deleteclass', body, {
      headers: { 'content-type': 'application/json', },
    }).then((res) => {
      console.log(res);
    }).catch((err) => console.log(err));

}


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}