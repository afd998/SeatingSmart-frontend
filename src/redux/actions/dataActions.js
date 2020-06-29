import { EDIT_CLASS, SET_CURRCLASS, DELETE_CLASS, DELETE_CHART, SET_CLASSES, ADD_CLASS, ADD_CHART, SET_CHARTS, SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
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
export const addClass = (newClass, history) => (dispatch) => {
  //dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("new class structure", newClass);
  axios.post('/addclass', newClass).then((res) => {
    console.log(res.data);
    history.push("/");
    dispatch({
      type: ADD_CLASS,
      payload: newClass
    })
  }).catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });

}

export const editClass = (newClass, setShowEdit) => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("edited class structure", newClass);
  axios.post('/editclass', newClass).then((res) => {
    console.log(".then() on axios edit");
    console.log(res.data);
    setShowEdit(false);
    dispatch({
      type: EDIT_CLASS,
      payload: newClass
    })
  }).catch(err => {
    console.log(".catch() on axios edit");
    if (err.response) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  });

}

export const changeClassName = (newClass, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  console.log("edited class structure", newClass);
  axios.post('/changeclassname', newClass).then((res) => {
    dispatch({
      type: EDIT_CLASS,
      payload: newClass
    })
    history.push(`/class/${newClass.className}`)
  }).catch(err => {
    console.log(err.response);
    if (err.response) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  });

}

export const deleteClass = (className) => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
  axios.delete('/deleteclass',{data: {className: className}}, {
    headers: { 'content-type': 'application/json', },
  }).then((res) => {
    dispatch({
      type: DELETE_CLASS,
      payload: className
    })
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