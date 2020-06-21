import React from 'react'
import {useEffect} from 'react'

import PropTypes from 'prop-types';
import { Route, Switch, Redirect, useRouteMatch, Link } from "react-router-dom";
import EditClass from './EditClass';
import { Button, InputBase, Grid } from '@material-ui/core'
import {getCharts} from '../../redux/actions/dataActions';
import Title from './Title';
import Chart from './Chart/Chart';

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core'
import { connect } from 'react-redux';

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

function ClassPage(props) {
  
  useEffect(() => {
      props.getCharts();
  }, []);

  const classes = useStyles();
  let match = useRouteMatch();

  let classPage =
    <div>
      <Title {...props} />
      <Grid container className={classes.form}>
        <Grid item xs={7}>
         <Chart charts = {props.charts}/>
        </Grid>
        <Grid item xs={5}>
          <EditClass classToEdit={props.classroom} replaceClass={props.replaceClass} />
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

ClassPage.propTypes = {
  getCharts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  charts: state.data.charts,
});

const mapActionToProps = { getCharts };

export default connect(mapStateToProps, mapActionToProps)(ClassPage);