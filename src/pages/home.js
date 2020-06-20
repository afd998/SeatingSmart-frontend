import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { addClass } from "../redux/actions/dataActions";
import { getClasses } from '../redux/actions/dataActions';
import Class from '../components/Class'
import ClassSkeleton from '../util/ClassSkeleton';
import CreateClass from "../components/createClass/CreateClass";
import EditClass from "../components/createClass/EditClass";
import CreateClassButton from "../components/createClass/CreateClassButton";
import ClassRoute from "../components/createClass/ClassRoute";
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
import { Fab } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import FourOFour from '../util/FourOFour';

const styles = {
  image: {
    margin: '0px 20px 10px 20px',
    height: '50px',
    width: '50px'
  },

  class: {
    margin: '50px 50px 50px 50px',
    padding: 30
  },
  logout: {
    // display: 'flex',
    //left: '50%',
    //textAlign: 'center',
    //margin: "0 auto",
    position: "sticky",
    top: 0,
    float: "right",
    padding: 30

  },
  classSpiner: {
    display: 'flex',
    margin: '0px 0px 0px 0px',
    padding: '0 30px',
    border: 0,
    borderRadius: 3,
    textAlgin: 'center'
  },
  root: {
    //background: 'linear-gradient(45deg, #00c853 30%, #a5d6a7 90%)',
    // border: 0,
    //borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: "100%",
    //height: 48,
    padding: '30px 0px',
    background: "000000",

  },
  noClassesMessage: {
    textAlgin: "center",
    left: "100px",
    margin: "50px 100px 0px 100px"
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
      let newState = oldstate.classes;
      const result = newState.filter(classs => classs.className != newClass.oldClassName);
      delete newClass.oldClassName;
      result.push(newClass);
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
        <div>
          <Typography variant="h3" > Welcome back</Typography>
          {this.state.classes.map((classs) => <Class key={classs.className} className={classes.class} class={classs} updateState={this.updateStateDelete.bind(this)} />)}
        </div>
      );

    const noClassesMessage =
      <Grid item xs={6}>
        <Typography variant="body1" className={classes.noClassesMessage}>
          Hey, looks like you haven't made any classes. Press the + to make some!
      </Typography>
      </Grid>

    return (
      <div className={classes.root}>
        <Grid item sm={12}>
          <Link to={`/`}>
            <Tooltip title="Home" placement="bottom">
              {/* <IconButton size="medium" edge="start"> */}
                <img
                  src={AppIcon}
                  className={classes.image}
                  alt="app icon"
                />
              {/* </IconButton> */}
            </Tooltip>
          </Link>
        </Grid>
        <Grid container justify="center" spacing={5}>
          {(this.props.location.pathname === '/') && classesMarkup}
          {(this.props.location.pathname === '/') && (this.state.loading === false) && (this.state.classes.length === 0) && noClassesMessage}
          {(this.props.location.pathname === '/') && (!this.state.displayEditClass) && <CreateClassButton />}
        </Grid>
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
        <Grid item sm={12}>
          <div className={classes.logout}>
            <Tooltip title="Logout" placement="top">
              <IconButton size="medium" onClick={this.handleLogout}>
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </div >
    )
  }
}

home.propTypes = {
  getClasses: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data
});

const mapActionToProps = { logoutUser, getClasses };

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(home));
