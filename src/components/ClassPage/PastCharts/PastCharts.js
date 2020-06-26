import React from 'react'
import { connect } from 'react-redux';
import { deleteChart } from '../../../redux/actions/dataActions';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import ChartCard from './ChartCard';

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex"
  }
}));

function PastCharts(props) {
  const classes = useStyles();
  let oldCharts = (props.charts && props.currClass) ? (props.charts[props.currClass].slice(0, props.charts[props.currClass].length - 1)) : (null)


  let chartsMarkup = oldCharts ? (
    oldCharts.map((chart) =>
      <div key={chart.chartName} className={classes.flexItem}>
        <ChartCard className={classes.chart} chart={chart} />
      </div>
    )
  ) : ("loading");



  return (
    <div className={classes.flexContainer}>
      {(oldCharts.length ===0 ) && <Typography variant= 'h5'> You have no additional charts in our database 😶. </Typography>}
      {(oldCharts.length !==0 ) && chartsMarkup}

    </div>
  )
}

const mapActionToProps = { deleteChart };

const mapStateToProps = (state) => ({
  charts: state.data.charts,
  currClass: state.data.currClass
});

export default connect(mapStateToProps, mapActionToProps)(PastCharts)
