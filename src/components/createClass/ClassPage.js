import React from 'react'
import { Route, Switch, Redirect, useRouteMatch, Link } from "react-router-dom";
import EditClass from './EditClass';
import { Button, InputBase } from '@material-ui/core'
import { Input } from '@material-ui/core'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  title: {
    margin: 'auto',
    textAlign: 'center',


  },
  titleEdit: {
    margin: '0 auto',
    textAlign: 'center',
    fontSize: "350%"

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
      <InputBase fullWidth={true} className={classes.titleEdit} defaultValue={props.classroom.className}/>
      {/* <Typography className={classes.title} variant="h2"> {props.classroom.className} </Typography> */}
      <Link to={`${match.url}/edit`}> <Button> Edit </Button> </Link>


    </div>

  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}/edit`}>
          <EditClass cancelRoute="" classToEdit={props.classroom} replaceClass={props.replaceClass} />
        </Route>
        <Route exact path={`${match.url}/edit+`}>
          <EditClass cancelRoute="/" classToEdit={props.classroom} replaceClass={props.replaceClass} />
        </Route>
        <Route path={`/class/${props.classroom.className}`}>
          {classPage}
          <Redirect to={`/class/${props.classroom.className}`} />
        </Route>
      </Switch>
    </div>
  )
}
