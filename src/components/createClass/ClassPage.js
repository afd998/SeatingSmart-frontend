import React from 'react'
import { Route, Switch, Redirect, useRouteMatch, Link } from "react-router-dom";
import EditClass from './EditClass';
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'

export default function ClassPage(props) {
  let match = useRouteMatch();
  let classPage =
    <div>
      <Typography variant="h2" > {props.classroom.className} </Typography>
      <Link to={`${match.url}/edit`}> <Button> Edit </Button> </Link>
      <Link to={`/`}> <Button> Home </Button> </Link>
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
