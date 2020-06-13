import React, { Component, forwardRef } from 'react';

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
import StudentCreator from './StudentCreator';
import ClassView from './ClassView';
import SuperList from './SuperList'



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
export default function CreateClass(props) {
  const { onClose, open, closeCreateClass, getNewClassInfo } = props;
  const classes = useStyles();
  const [classname, setclassname] = React.useState("");
  const [showSameNameMessage, setShowSameNameMessage] = React.useState("");
  const [students, setStudnets] = React.useState(["james"]);
  const [ShowAddStudentButton, setShowAddStudentButton] = React.useState(true);
  const [errors, seterrors] = React.useState({});
  const [numberOfGroups, setnumberOfGroups] = React.useState("");
  const [studentsPerGroup, setstudentsPerGroup] = React.useState("");


  const addAStudent = (event) => {
    setShowAddStudentButton(!ShowAddStudentButton);
  }
  const handleChange = (event) => {
    switch (event.target.name) {
      case "classname":
        setclassname(event.target.value);
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

  const getStudents = (rows) => {
    setStudnets(rows);
    getNewClassInfo({rows, classname, numberOfGroups, studentsPerGroup})
  }

  const finsishCreateClass = () =>{
    closeCreateClass();
  }

  return (
    <Paper elevation={2} className={classes.paper}>
      <Typography className={classes.title} variant="h2"> Create a New Class</Typography>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <TextInput />
        </Grid>
        {/*<Grid item xs={4}>
           {ShowAddStudentButton && (<Fab
            variant="extended"
            size="large"
            color="primary"
            aria-label="add"
            className={classes.fabAddStudent}
            onClick={addAStudent}
          >
            <AddIcon className={classes.icon} />
                   Add A Student
          </Fab>)}
          {(!ShowAddStudentButton) && <StudentCreator closeSameNameAlert={closeSameNameAlert} sameNameMessage={showSameNameMessage} closeStudentCreator={closeAddStudent} submitAddStudent={submitAddStudent} />} 
        </Grid>*/}
        <Grid item xs={8}>
          {/* <ClassView /> */}
          <SuperList className={classes.superlist} getStudents={getStudents} />
        </Grid>
        <Grid item xs={12}>
          <Button
            //variant="extended"
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
            //variant="extended"
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
