import React, { Component, forwardRef } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import TextInput from './TextInput';
import SuperList from './SuperList'
import PropTypes from 'prop-types';

import { addClass } from "../../redux/actions/dataActions";


const useStyles = makeStyles(theme => ({
  superlist: {
    //padding: "30px"

  },
  icon: {
    margin: theme.spacing(1),

  },
  paper: {
    minWidth: "400px",
    //
    // minHeight: "400px",
    //flexGrow: 1,
    // background: "#fdc92a",
    margin: "2px 5px 2px 5px",
    textAlign: 'center',
    backgroundColor: '#FAACA8',
    backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)'
    
  },
  root: {
    flexGrow: 1,
  },
  title: {
    margin: "0px 0px 10px 60px",
    textAlign: 'center',

  },

  fab: {
    margin: "0px 200px 0px 200px",
    textAlign: 'center',

  },
  fabAddStudent: {
    margin: "80px auto auto auto",
    textAlign: 'center',

  },


  textField: {
    margin: '20px 0px 0px 0px',
    textAlign: 'center',
    minWidth: '400px'

  },
  textinput: {
    //margin: '20px 0px 0px 0px',
    textAlign: 'center',
    maxWidth: '50px'

  },
}));

function CreateClass(props) {
  const {closeCreateClass, getNewClassInfo } = props;
  const classes = useStyles();
  const [className, setclassName] = React.useState("");
  const [students_state, setStudents_state] = React.useState({
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Gender', field: 'gender', lookup: { 'Male': 'Male', 'Female': 'Female', 'Non-binary': 'Non-binary' } },
        { title: 'Person of Color', field: 'poc',  lookup: { 0: 'No', 1: 'Yes' }},
      ],
      data: [],
    });
  const [numberOfGroups, setnumberOfGroups] = React.useState("");
  const [studentsPerGroup, setstudentsPerGroup] = React.useState("");

  const finsishCreateClass = () => {
    let students=students_state.data;
    let newClass = {students, className, numberOfGroups, studentsPerGroup }
    props.addClass(newClass, closeCreateClass, getNewClassInfo);
  }

  return (
    <Paper elevation={2} className={classes.paper}>
      <Typography className={classes.title} variant="h2"> Create a New Class</Typography>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <TextInput 
            numberOfGroups={numberOfGroups}
            setnumberOfGroups={setnumberOfGroups}
            studentsPerGroup={studentsPerGroup}
            setstudentsPerGroup= {setstudentsPerGroup}
            className={className}
            setclassName= {setclassName}/>
        </Grid>
        <Grid item xs={8}>
          <SuperList className={classes.superlist} state = {students_state} setState = {setStudents_state}/>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="large"
            color="secondary"
            aria-label="cancel"
            className={classes.fab}
            onClick={closeCreateClass}
          >
            <CancelIcon className={classes.icon} />
                   Cancel
            </Button>
          <Button
            size="large"
            aria-label="finished"
            className={classes.fab}
            onClick={finsishCreateClass}
          >
            <SaveIcon className={classes.icon} />
                   Finished
            </Button>
        </Grid>
      </Grid>
    </Paper >
  )
}

CreateClass.propTypes = {
  addClass: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

const mapActionToProps = { addClass };

export default connect(mapStateToProps, mapActionToProps)(CreateClass);
