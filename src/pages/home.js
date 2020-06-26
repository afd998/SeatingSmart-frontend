import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { addClass } from "../redux/actions/dataActions";
import { getClasses } from '../redux/actions/dataActions';
import Class from '../components/HomeUtil/Class'
import ClassSkeleton from '../util/ClassSkeleton';
import CreateClass from "../components/createClass/CreateClass";
import EditClass from "../components/ClassPage/EditClass";
import CreateClassButton from "../components/HomeUtil/CreateClassButton";
import ClassRoute from "../components/HomeUtil/ClassRoute";
import AppIcon from "../images/icon.png"

//import themeFile from "../util/theme"


import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

const styles = {
  image: {
    //margin: '10px 10px 10px 10px',
    height: '40px',
    width: '40px'
  },
  class: {
    margin: '50px 50px 50px 50px',
    padding: 20
  },
  logout: {
    float: "right",
    position: "sticky",
    bottom: 0,
  },
  root: {
    border: 10,
    borderRadius: 3,
    padding: '30px 30px 30px 30px',
  },
  noClassesMessage: {
    textAlgin: "center",
    left: "100px",
    margin: "50px 100px 0px 100px"
  },
  welcome: {
    textAlgin: "center",
    margin: "3% 30%"
    // left: "100px",
    //margin: "50px 100px 0px 100px"
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"

  },
  flexItem: {
    //height: "200px"
    flexBasis: "250px"
  },
  createClass: {
    //height: "200px",
    margin: "0 50px"

  }
};


export class home extends Component {
  state = {
    classes: "init",
    loading: true,
    classToEdit: "",
  }


  componentDidMount() {
    console.log("home component mounted");
    let token = localStorage.getItem('FBIdToken');
    if (!token) {
      window.location.href = '/login';
    }
    axios.defaults.headers.common['Authorization'] = token;
    axios.get('/getclasses').then(res => {
      this.setState({ classes: res.data.classes, loading: false });
    }).catch((err) => {
      console.log("error getting classes");
    });
  }

  replaceClass = (newClass) => {
    this.setState((oldstate) => {
      let newState = oldstate.classes.slice()
      const result = newState.filter(classs => classs.className !== newClass.oldClassName);
      delete newClass.oldClassName;
      result.push(newClass);
      this.props.history.push(`/class/${newClass.className}`);

      return { classes: result };
    });
  }

  updateStateDelete = (className) => {
    this.setState((oldstate) => {
      let newState = oldstate.classes;
      const result = newState.filter(classs => classs.className != className);
      return { classes: result };
    });
  }

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login')
  };


  getNewClassInfo = (newClass) => {
    this.setState((oldstate) => {
      let e = oldstate.classes;
      e.push(newClass);
      return { classes: e };
    }
    );
  };


  render() {
    const { classes } = this.props;
    ///DISPLAY CREAT CLASS OR BUTTON
    let createClass = <Grid item >
      <CreateClass getNewClassInfo={this.getNewClassInfo.bind(this)} />
    </Grid>;

    let classesMarkup = this.state.classes === "init" ? (
      <ClassSkeleton />
    ) : (

        this.state.classes.map((classs) =>
          <div className={classes.flexItem} key={classs.className}>
            <Class  className={classes.class} class={classs} updateState={this.updateStateDelete.bind(this)} />
          </div>
        ));

    const noClassesMessage =
      <div className={classes.flexItem}>
        <Typography variant="body1" className={classes.noClassesMessage}>
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

        {(this.props.location.pathname === '/') && (<Typography variant="h3" align="center" className={classes.welcome}> Welcome back</Typography>)}
        <div className={classes.flexContainer}>
          {(this.props.location.pathname === '/') && classesMarkup}
          {(this.props.location.pathname === '/') && (this.state.loading === false) && (this.state.classes.length === 0) && noClassesMessage}
          <div className={classes.createClass}>
            {(this.props.location.pathname === '/') && (!this.state.displayEditClass) && <CreateClassButton />}
          </div>
        </div>

        <Switch>
          <Route exact path="/new">
            {createClass}
          </Route>
          <Route path={`/class/:URLclassName`}>
            <ClassRoute allClasses={this.state.classes} replaceClass={this.replaceClass.bind(this)} />
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
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionToProps = { logoutUser, getClasses };

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(home));
