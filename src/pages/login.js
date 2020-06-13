import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import firebase from 'firebase/app';
import 'firebase/auth';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { Link } from "@material-ui/core";
import { Grid } from "@material-ui/core"
import AppIcon from "../images/icon.png"
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import "../App.css";
import { connect } from 'react-redux';
import { loginUser, loginUserGoogle } from '../redux/actions/userActions';
import themeFile from "../util/theme"
import config from "../firebase.config.js";
const styles = themeFile;
firebase.initializeApp(config)
var provider = new firebase.auth.GoogleAuthProvider();
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("the error object from the store is:", nextProps.UI.errors);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);

  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleAlertClose = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  googleFunc = (event) => {
    var googleLogin = (a, b) => { this.props.loginUserGoogle(a, b); };
    var ghistory = this.props.history;
    event.preventDefault();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      firebase.auth().currentUser.getIdToken().then((token) => {
        console.log("currentUser", firebase.auth().currentUser);
        var userData = {
          token: token
        };
        return userData;
      }).then((userData) => {
        return googleLogin(userData, ghistory);
      })
        .catch(err => {
          console.error(err);
        });
    }).catch(err => {
      console.error(err);
    });
  }



  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img
              src={AppIcon}
              className={classes.image}
              alt="app icon"
            />
            <Typography variant="h2" className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit} >
              <TextField
                id='email'
                name='email'
                type=' email'
                label='Email'
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange}
                helperText={errors.email}
                error={errors.email || errors.general ? true : false}
                fullWidth>
              </TextField>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                name="password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password || errors.email || errors.general? true : false}
                fullWidth>
              </TextField>
              {errors.general && (
                <Typography variant="body2" color= "error" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}

              <Button
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                GO
                {loading && (
                  <CircularProgress size={20} color="primary" className={classes.progress} />
                )}

              </Button>
            </form>
        
             
              <Link underline="none" href="/signup" color="inherit" to="/signup">
                <Button variant="outlined" color="primary" className={classes.signup} >
                  Create an account for free!
                </Button>
              </Link>
              <GoogleButton onClick={this.googleFunc} className={classes.google} >
                Sign in with Google
                </GoogleButton>
          </Grid>
          <Grid item sm />
        </Grid>

      </div >
    )
  }
}


login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginUserGoogle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = { loginUser, loginUserGoogle };


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
