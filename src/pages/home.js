import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { addClass } from "../redux/actions/dataActions";
import { getClasses } from '../redux/actions/dataActions';
import Class from '../components/Class'
import ClassSkeleton from '../util/ClassSkeleton';

//import themeFile from "../util/theme"


import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import CreateClass from "../components/createClass/CreateClass";
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { Link } from '@material-ui/core'
import { Fab } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

const styles = {

  createClass: {
    minWidth: 275,
    //display: 'flex',
    //flexWrap: 'wrap',
    //border: 10,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',

  },
  plus: {
    margin: '50px 0px 20px 0px',
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
    displayCreateClass: false,
  }


  componentDidMount() {
    //this.props.getClasses();
    console.log("home component mounted");
    let token =localStorage.getItem('FBIdToken');
    if(!token){
      window.location.href = '/login';
    }
    axios.defaults.headers.common['Authorization'] =token;
    axios.get('/getclasses').then(res => {
        this.setState({classes: res.data.classes});
        console.log(res.data.classes);
      }).catch((err) => {
          console.log("error getting classes");
      });
  }

  displayCreateClass = () => {
    this.setState({
      displayCreateClass: !this.state.displayCreateClass,
    })
  }
  updateStateDelete = (className) => {
    this.setState((oldstate) =>{
      let newState=oldstate.classes;
      for (let i = 0; i <oldstate.length; i++) {
        if (oldstate[i].className === className) {
          delete newState[i];
        }
      }
      return {classes: newState};
    });
  }

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login')
  };


  getNewClassInfo = (newClass) => {
    this.setState((oldstate) => {
      let e =  oldstate.classes.push(newClass);
      return {classes: e};
    }
    );
  };


  render() {
    const {classes} =this.props;
    const {thisloading} = this.props.data;
    ///DISPLAY CREAT CLASS OR BUTTON
    let createClass = <Grid item >
      <CreateClass closeCreateClass={this.displayCreateClass.bind(this)} open={true} getNewClassInfo={this.getNewClassInfo.bind(this)} />
                  </Grid>;
    let createClassButton =
      <Grid item xs={2} className={classes.plus} >
        <Tooltip title="New Class" placement="top">
          <Fab variant="extended"
            size="large"
            color="primary"
            aria-label="add"
            onClick={this.displayCreateClass}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>;
    console.log(this.state.classes);
    let classesMarkup = this.state.classes == "init" ? (
     <ClassSkeleton/> 
    ) : (
      this.state.classes.map((classs) => <Class key={classs.className} className={classes.class} class={classs} updateState={this.updateStateDelete.bind(this)}/>)
    ); 

    const noClassesMessage =
      <Grid item xs={6}>
        <Typography variant="body1" className={classes.noClassesMessage}>
          Hey, looks like you haven't made any classes. Press the + to make some!
      </Typography>
      </Grid>

    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={5}>
          {classesMarkup}
          {this.state.displayCreateClass && createClass}
          {(!this.state.displayCreateClass) && ((classesMarkup.length === 0) && noClassesMessage)}
          {(!this.state.displayCreateClass) && createClassButton}

          <Grid item sm={12}>
            <div className={classes.logout}>
              <Tooltip title="Logout" placement="top">
                <IconButton size="medium" onClick={this.handleLogout}>
                  <KeyboardReturn color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
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
