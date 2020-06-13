import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData).then((res) => {
    console.log(res.data);
    setAuthorizationHeader(res.data.token);
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');

  }).catch(err => {
    console.log(err);

    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });

}

export const loginUserGoogle = (userData, history) => (dispatch) => {
  console.log("entered loginUserGoogle function");
  dispatch({ type: LOADING_UI });
  const FBIdToken = `Bearer ${userData.token}`;
  axios.defaults.headers.common['Authorization'] = FBIdToken;
  axios.post('/createUserGoogle', userData).then((res) => {
    console.log("server has successfully axios posted to createUserGoogle")
    console.log(res.data);
    dispatch({ type: CLEAR_ERRORS });
    localStorage.setItem('FBIdToken', FBIdToken);
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  }).catch(err => {
    console.error("Axios post to createUserGoogle got an error");
    dispatch({
      type: SET_ERRORS,
      payload: err
    });
  });
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData).then((res) => {
    console.log(res.data);
    setAuthorizationHeader(res.data.token);
    //dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');

  }).catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });

}
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Autorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: CLEAR_ERRORS });
}
export const getUserData = () => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  axios.get('/user').then((res) => {
    dispatch({
      type: SET_USER,
      payload: res.data
    });
  }).catch((err) => console.log(err));
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}