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
import AppIcon from "../../images/icon2.png"
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { connect } from 'react-redux';
import { loginUser, loginUserGoogle } from '../redux/actions/userActions';
import config from "../../firebase.config.js";

const styles = (theme) => ({
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  image: {
    margin: '20px auto 20px auto',
    height: '200px',
    width: '200px'
  },
  google: {
    margin: '20px auto 20px auto',
    height: '10px',
    width: '10px'
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: "300px",
    margin: "0 auto",
    backgroundColor: "#17A398"

  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    minWidth: "300px"
  },
  image: {
    margin: '20px auto 20px auto',
    height: '200px',
    width: '200px'
  },
  signup: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  textField: {
    margin: '0px auto 20px auto'
  },
  button: {
    margin: "0px 0px 0px 0px",
    textAlign: "center"
  },
  customError: {
    margin: '10px auto 10px auto',
    color: "black",
    fontSize: "0.8rem"
  },
  progress: {
    position: 'absolute'
  },
})

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
      <div className={classes.login}>
        <Link href="/home"> <img
          src={AppIcon}
          className={classes.image}
          alt="app icon"
        /> </Link>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
            </Typography>
        <form className = {classes.form} noValidate onSubmit={this.handleSubmit} >
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
            fullWidth
          >
          </TextField>

          <br />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            name="password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange}
            helperText={errors.password}
            error={errors.password || errors.email || errors.general ? true : false}
            fullWidth
          >
          </TextField>
          {errors.general && (
            <Typography variant="body2" color="error" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <br />
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
            Don't have an Account?
            </Button>
        </Link>
        <GoogleButton onClick={this.googleFunc} className={classes.google} >
          Sign in with Google
          </GoogleButton>
      </div>
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
