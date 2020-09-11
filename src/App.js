import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import themeFile from "./components/util/theme"
import "./App.css";
import { ThemeProvider as MuiThemeProvider, responsiveFontSizes } from "@material-ui/core/styles/";
import { CssBaseline } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import AuthRoute from './components/util/AuthRoute'
//PAGES
import home from "./components/pages/home";
import login from "./components/pages/login/login";
import landing from "./components/pages/landing/landing";
import signup from "./components/pages/signup";
import about from "./components/pages/about";

//REDUX
import { Provider } from 'react-redux';
import store from './components/redux/store';
import { SET_AUTHENTICATED } from './components/redux/types';
import { logoutUser, getUserData } from "./components/redux/actions/userActions";
import axios from "axios";
var theme = createMuiTheme(themeFile);
theme = responsiveFontSizes(theme);

theme.typography.h1 = {
  fontWeight: "normal",
  fontSize: '3.5rem',
  '@media (min-width:600px)': {
    fontSize: '5.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6.4rem',
  },

};

const token = localStorage.FBIdToken;

axios.defaults.baseURL = 'https://us-central1-seatingsmart-15114.cloudfunctions.net/api';
//axios.defaults.baseURL = "http://localhost:5000/seatingsmart-15114/us-central1/api";

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <div className = {theme.root}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <div className="container">
            <Switch>
              <AuthRoute exact path="/home" component={landing} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <AuthRoute exact path="/about" component={about} />

              <Route path="/" component={home} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
    </div>
  );
}

export default App;
