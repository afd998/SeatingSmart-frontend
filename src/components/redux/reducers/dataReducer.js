import { SET_CURRCLASS, LOADING_DATA, EDIT_CLASS, DELETE_CLASS, ADD_CLASS, SET_CLASSES, ADD_CHART, SET_CHARTS, DELETE_CHART } from '../types';


const initialState = {
  classesArray: [],
  loading: false,
  charts: {},
  currClass: ""
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRCLASS:
      return {
        ...state,
        currClass: action.payload.className
      };
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
    case ADD_CLASS:
      return {
        ...state,
        classesArray: [...state.classesArray, action.payload]
      };
    case DELETE_CLASS:
      return {
        ...state,
        classesArray: state.classesArray.filter((classs) => classs.className !== action.payload),
      };
    case EDIT_CLASS:
      // let index = 0;
      // while (index < state.classesArray.length) {
      //   if (state.classesArray[index].className === action.payload.oldClassName) {
      //     break;
      //   }
      //   index++;
      // }

      return {
        ...state,
        classesArray: state.classesArray.map(
          (classs, i) => classs.className ===action.payload.oldClassName? (action.payload):(classs))
      };

    case SET_CLASSES:
      return {
        ...state,
        classesArray: action.payload,
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