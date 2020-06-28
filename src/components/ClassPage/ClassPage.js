import React from 'react'
import { useEffect } from 'react'

import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from "react-router-dom";
import EditWrapper from './EditWrapper';
import { getCharts } from '../../redux/actions/dataActions';
import Title from './Title';
import Chart from './Chart/Chart';
import NewChart from './NewChart/NewChart';
import NewChartButton from './NewChartButton';
import PastChartsMain from './PastCharts/PastChartsMain';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    margin: "40px 0px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    textAlign: "center"

  },
  NewChartButton: {
    //flexBasis: "5%",
    width: "15%",
    alignSelf: "center",
    //margin: "20px 0px 0px 0px"
  },
  currChart: {
    flexBasis: "40%",

  },

  EditWrapper: {
    flexBasis: "40%"

  },

  PastChartsMain: {
    flexBasis: "100%",
    display: "inline-block"
  }

}));

function ClassPage(props) {

  useEffect((props) => {
    props.getCharts(props.classroom.className);
  }, []);

  let charts = props.charts ? (props.charts[props.classroom.className]) : (null);

  const classes = useStyles();
  console.log("charts", charts);
  let currChart =
    <div className={classes.currChart}>
      {charts && (charts.length !== 0) && (<Chart showDel chart={charts[charts.length - 1]} />)}
      {charts && (charts.length === 0) && <Typography variant="h5"> You have no charts <span role='img' aria-label="emoji"> 🧐</span>. Press the plus button to make some! </Typography>}
      {!charts && "loading"}
    </div>

  let classPage =
    <div>
      <Title {...props} />

      <div className={classes.flexContainer}>
        <div className={classes.NewChartButton}>
          <NewChartButton
            route={`/class/${props.classroom.className}/new`} />
        </div>
        {currChart}
        <div className={classes.EditWrapper}>
          <EditWrapper
            classToEdit={props.classroom}
            replaceClass={props.replaceClass} />
        </div>
      </div>
      <div className={classes.PastChartsMain}>
        <PastChartsMain />
      </div>
    </div>

  return (
    <div>
      <Switch>
        <Route exact path={`/class/${props.classroom.className}`}>
          {classPage}
          {/* <Redirect to={`/class/${props.classroom.className}`} /> */}
        </Route>
        <Route exact path={`/class/${props.classroom.className}/new`}>
          <NewChart classroom={props.classroom} cancelPath={`/class/${props.classroom.className}`} />
        </Route>
        <Route path="/">
          <Redirect to="/" />
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