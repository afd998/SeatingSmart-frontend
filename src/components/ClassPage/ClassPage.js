import React from 'react'
import { Route, Switch, Redirect, useRouteMatch, Link } from "react-router-dom";
import EditClass from './EditClass';
import { Button, InputBase, Grid } from '@material-ui/core'
import { Input } from '@material-ui/core'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import SuperList from '../createClass/SuperList';

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
  card: {
    margin: '10px 10px 10px 10px',
    backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%,  rgba(130,205,221,1) 0%, rgba(255,247,153,1) 90% )",
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

export default function ClassPage(props) {

  const classes = useStyles();
  let match = useRouteMatch();

  let classPage =
    <div>
      <Title {...props} />
      <Grid container className={classes.form}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={5}>
          <EditClass classToEdit={props.classroom} replaceClass= {props.replaceClass} />
        </Grid>
      </Grid>
    </div>

  return (
    <div>
      <Switch>
        <Route path={`/class/${props.classroom.className}`}>
          {classPage}
          <Redirect to={`/class/${props.classroom.className}`} />
        </Route>
      </Switch >
    </div >
  )
}
