import React, { Component, forwardRef } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

//MUI STUFF
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core'
import { Fab } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import ClassView from './ClassView';
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

  },
  root: {
    flexGrow: 1,
  },
  title: {
    margin: "0px 60px 60px 60px",
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
  const { onClose, open, closeCreateClass, getNewClassInfo } = props;
  const classes = useStyles();
  const [className, setclassName] = React.useState("");
  const [showSameNameMessage, setShowSameNameMessage] = React.useState("");
  const [students, setStudnets] = React.useState(["james"]);
  const [ShowAddStudentButton, setShowAddStudentButton] = React.useState(true);
  const [errors, seterrors] = React.useState({});
  const [numberOfGroups, setnumberOfGroups] = React.useState("");
  const [studentsPerGroup, setstudentsPerGroup] = React.useState("");

  const handleChange = (event) => {
    switch (event.target.name) {
      case "classname":
        setclassName(event.target.value);
        break;
      case "numberOfGroups":
        setnumberOfGroups(event.target.value);
        break;
      case "studentsPerGroup":
        setstudentsPerGroup(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    onClose();
  };

  const submitAddStudent = (studentDetails) => {
    var alreadyUsed = false
    for (const student of students) {
      if (student.name === studentDetails.name) {
        alreadyUsed = true;
        break;
      }
    }
    if (!alreadyUsed) {
      students.push(studentDetails)
    } else {
      setShowSameNameMessage(true);
    }
  }

  const liftStudents = (rows) => {
    console.log("the students object that was lifted: ", rows);
    setStudnets(rows);
  }
  const liftClassMetaData = (metadata) => {
    console.log("the metadata object that was lifted: ", metadata);
    setstudentsPerGroup(metadata.studentsPerGroup);
    setclassName(metadata.className);
    setnumberOfGroups(metadata.numberOfGroups);
  }
  const finsishCreateClass = () => {
    props.addClass({ students, className, numberOfGroups, studentsPerGroup });
    closeCreateClass();
  }

  return (
    <Paper elevation={2} className={classes.paper}>
      <Typography className={classes.title} variant="h2"> Create a New Class</Typography>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <TextInput  liftClassMetaData={liftClassMetaData}/>
        </Grid>
        <Grid item xs={8}>

          <SuperList className={classes.superlist} liftStudents={liftStudents} />
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
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionToProps = { addClass };

export default connect(mapStateToProps, mapActionToProps)(CreateClass);
