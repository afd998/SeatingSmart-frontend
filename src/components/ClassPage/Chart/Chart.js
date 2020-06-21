import React from 'react'
import {Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  title: {
    margin: '0 1%',


  },
  form: {
    margin: 'auto auto auto auto%',


  },
  titleEdit: {
    margin: '0 1%',
    textAlign: 'center',
    fontSize: "338%"

  },
  paper: {
    backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    },
  content: {
    padding: 25,
  },
  delClass: {
    margin: '10px 10px 10px 10px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
function Chart(props) {
  const classes = useStyles();
console.log("chart", props.chart);
  return (

    <div>
      <Paper className ={classes.paper} elevation={1} />
      <p> test</p>

      <Paper />
    </div>
  )
}

export default Chart
