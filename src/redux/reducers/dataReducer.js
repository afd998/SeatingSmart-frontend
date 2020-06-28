import { SET_CURRCLASS, SET_CLASSES, ADD_CHART, SET_CHARTS, DELETE_CHART } from '../types';


const initialState = {
  classesArray: [],
  loading: false,
  charts: {},
  currClass: ""
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRCLASS:
      console.log("here");
      return {
        ...state,
        currClass: action.payload.className
      };

    case SET_CLASSES:
      return {
        ...state,
        classesArray: action.payload.className,
        loading: false
      };

    case SET_CHARTS:
      return {
        ...state,
        charts: { ...state.charts, [action.payload.className]: action.payload.data },
        loading: false,
      };
    case ADD_CHART:
      return {
        ...state,
        charts: {
          ...state.charts, [action.payload.className]: [...state.charts[action.payload.className], action.payload],
        }
      };
    case DELETE_CHART:
      console.log("should be an arry", state.charts[action.payload.className]);
      return {
        ...state,
        charts: {
          ...state.charts, [action.payload.className]: state.charts[action.payload.className].filter(chart => chart.chartName !== action.payload.chartName),
        }
      };
    default:
      return state;
  }
}