import React, { Component } from 'react'
import PropTypes from 'prop-types';
//MUI STUFF
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { Link } from "@material-ui/core";
import { Grid } from "@material-ui/core"
import AppIcon from "../../images/icon2.png"
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
//REDUX
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: "300px",
    margin: "0 auto"

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

export class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      instructorName: '',
      errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      instructorName: this.state.instructorName
    };
    this.props.signupUser(newUserData, this.props.history)
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };




  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <div className = {classes.root}>
        <Link href="/home"><img
          src={AppIcon}
          className={classes.image}
          alt="Tsunami bt hokusai"
        />
        </Link>
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
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
            error={errors.email ? true : false}
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
            error={errors.password ? true : false}
            fullWidth>
          </TextField>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            className={classes.textField}
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            fullWidth>
          </TextField>
          <TextField
            id="Instructor Name"
            label="Name"
            type="text"
            name="instructorName"
            className={classes.textField}
            value={this.state.instructorName}
            onChange={this.handleChange}
            helperText={errors.instructorName}
            error={errors.instructorName ? true : false}
            fullWidth>
          </TextField>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            disabled={loading}
          >
            GO
                {loading && (
              <CircularProgress size={20} color="primary" className={classes.progress} />
            )}
          </Button>
        </form>
        <div>
          <Link underline="none" href="/login" color="inherit" to="/login">
            <Button variant="outlined" color="primary" className={classes.signup} >
              Already have an account?
                </Button>
          </Link>
        </div>
      </div>
    )
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapSateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapSateToProps, { signupUser })(withStyles(styles)(signup));
