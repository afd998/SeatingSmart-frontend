import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { getClasses } from '../redux/actions/dataActions';
import { getUserData } from '../redux/actions/userActions';

import Class from '../components/HomeUtil/Class'
import ClassSkeleton from '../util/ClassSkeleton';
import CreateClass from "../components/createClass/CreateClass";
import CreateClassButton from "../components/HomeUtil/CreateClassButton";
import ClassRoute from "../components/HomeUtil/ClassRoute";
import AppIcon from "../images/icon2.png"

//import themeFile from "../util/theme"

import { withStyles } from '@material-ui/core/styles';
import { IconButton, CircularProgress } from '@material-ui/core'
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

const styles = {
  image: {
    //margin: '10px 10px 10px 10px',
    height: '40px',
    width: '40px',
    margin: '30px 30px 10px 30px',
  },
  class: {
    margin: '50px 50px 50px 50px',
    padding: 20
  },
  logout: {
    margin: "0px 0px 0px 85%",
    //position: "fixed",
    // margin: '0px 0 2% 92%',
    //bottom: 0,
    alignSelf: "flex-end"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  noClassesMessage: {
    textAlgin: "center",
    margin: '20px 10px 20px 10px',


  },
  welcome: {
    textAlgin: "center",
    margin: "3% 0%"
  },
 


  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"

  },
  flexItem: {
    margin: "0px 0px 30px 0px",
    flexBasis: "250px"
  },
  createClass: {
    //height: "200px",
    margin: "0 50px 30px 50px"

  }
};


export class home extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('FBIdToken');
    if (!token) {
      window.location.href = '/login';
    }
    this.props.getClasses();
    this.props.getUserData();
  }


  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login')
  };


  render() {
    const { classes } = this.props;
    const classesArray = this.props.classesArray ? (this.props.classesArray) : (null);
    const instructorName = this.props.user.credentials ? (this.props.user.credentials.instructorName) : (null);

    let classesMarkup = (!this.props.classesArray) ? (
      <ClassSkeleton />
    ) : (
        classesArray.map((classs) =>
          <div className={classes.flexItem} key={classs.className}>
            <Class className={classes.class} class={classs} />
          </div>
        ));

    const noClassesMessage =
      <div className={classes.noClassesMessage}>
        <Typography variant="h5" className={classes.noClassesMessage}>
          Hey, looks like you haven't made any classes. Press the + to make some!
      </Typography>
      </div>

    return (
      <div className={classes.root}>
        <Link to={`/`}>
          <Tooltip title="Home" placement="right">
            <img
              src={AppIcon}
              className={classes.image}
              alt="app icon"
            />
          </Tooltip>
        </Link>
        {(this.props.location.pathname === '/') && (instructorName) && (<Typography variant="h4" align="center" className={classes.welcome}> {`Welcome back ${instructorName}!`} </Typography>)}
        <div className={classes.flexContainer}>
          {(this.props.location.pathname === '/') && classesMarkup}
          {(this.props.location.pathname === '/') && (classesArray) && (classesArray.length === 0) && noClassesMessage}
          <div className={classes.createClass}>
            {(this.props.location.pathname === '/') && <CreateClassButton />}
          </div>
        </div>

        <Switch>
          <Route exact path="/new">
            <CreateClass />
          </Route>
          <Route path={`/class/:URLclassName`}>
            <ClassRoute />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>

        <div className={classes.logout}>
          <Tooltip title="Logout" placement="top">
            <IconButton size="medium" onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div >
    )
  }
}

home.propTypes = {
  getClasses: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  classesArray: state.data.classesArray,
  user: state.user
});

const mapActionToProps = { logoutUser, getClasses, getUserData };

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(home));
