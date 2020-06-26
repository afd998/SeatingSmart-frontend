import { SET_CURRCLASS, DELETE_CHART, SET_CLASSES, ADD_CHART, SET_CHARTS, SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
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

export const getCharts = (className) => (dispatch) => {

  dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  axios.post('/getcharts', { "className": className }).then(res => {
    console.log('hereaction');
    dispatch({
      type: SET_CURRCLASS,
      payload: { className: className }
    });
    dispatch({
      type: SET_CHARTS,
      payload: { data: res.data.charts, className: className }
    });
  }).catch((err) => {
    dispatch({
      type: SET_CHARTS,
      payload: []
    });
    console.log(err);
  });
}
export const addChart = (newChart, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  axios.post('/addchart', newChart).then(res => {
    dispatch({
      type: ADD_CHART,
      payload: newChart
    });

    history.push(`/class/${newChart.className}`);
    console.log(res.data);
  }).catch((err) => {
    console.log(err);

    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });
}
export const addClass = (newClass, getNewClassInfo, history) => (dispatch) => {
  //dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("new class structure", newClass);
  axios.post('/addclass', newClass).then((res) => {
    console.log(res.data);
    getNewClassInfo(newClass);
    history.push("/");
    // dispatch({
    //   type: SET_CLASSES,
    //   payload: newClass
    // })
  }).catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });

}
export const editClass = (newClass, replaceClass) => (dispatch) => {
  //dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("edited class structure", newClass);
  axios.post('/editclass', newClass).then((res) => {
    replaceClass(newClass);
    dispatch({
      type: SET_CLASSES,
      payload: newClass
    })
  }).catch(err => {
    if (err.response) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
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

export const deleteChart = (toDelete) => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  axios.delete('/deletechart', toDelete, {
    headers: { 'content-type': 'application/json', },
  }).then((res) => {
    dispatch({
      type: DELETE_CHART,
      payload: toDelete.data
    })
  }).catch((err) => console.log(err));
}


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}