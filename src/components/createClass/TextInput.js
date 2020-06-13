import React, { Component } from 'react';
//MUI STUFF
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { Fab } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  main:{
    margin: "140px 0px 0px 0px",
    
  },
  icon: {
    margin: theme.spacing(1),

  },
  paper: {
    minWidth: "400px",
    minHeight: "800px",
    //flexGrow: 1,

  },
  root: {
    flexGrow: 1,
  },
  title: {
    margin: "2px 2px 2px 2px",
    textAlign: 'center',

  },
  fab: {
    margin: theme.spacing(1),
    textAlign: 'center',

  },

  textField: {
    margin: '0px 0px 0px 0px',
    textAlign: 'center',
    width: "90%",
    //flexShrink: 1,
    //flexGrow: 1,



  },
  textinput: {
    //margin: '20px 0px 0px 0px',
    textAlign: 'center',
    maxWidth: '50px'

  },
}));

export default function TextInput(props) {
  const { onClose, open } = props;
  const classes = useStyles();
  const [classname, setclassname] = React.useState("");
  const [errors, seterrors] = React.useState({});
  const [numberOfGroups, setnumberOfGroups] = React.useState("");
  const [studentsPerGroup, setstudentsPerGroup] = React.useState("");

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


  return (
    <div >
      <Grid container spacing={1} className = {classes.main}>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            id='classname'
            name='classname'
            type='text'
            label='Class Name'
            className={classes.textField}
            value={classname}
            onChange={handleChange}
            helperText={errors.classname}
            error={errors.classname ? true : false}
          //fullWidth
          >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            id='numberOfGroups'
            name='numberOfGroups'
            type='text'
            label='Number of Groups/Tables'
            className={classes.textField}
            value={numberOfGroups}
            onChange={handleChange}
            helperText={errors.numberOfGroups}
            error={errors.numberOfGroups ? true : false}
          //fullWidth
          >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            id='studentsPerGroup'
            name='studentsPerGroup'
            type='text'
            label='Number of Students in a Group/Table'
            className={classes.textField}
            value={studentsPerGroup}
            onChange={handleChange}
            helperText={errors.studentsPerGroup}
            error={errors.studentsPerGroup ? true : false}
          >
          </TextField>
        </Grid>
      </Grid>
    </div>
  )
}
