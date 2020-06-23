import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Table from './Table';

function Chart(props) {
  const useStyles = makeStyles((theme) => ({
    flexContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    },
    paper: {
    },

    flexItem: {

    }
  }));

  const classes = useStyles();
  const { chart } = props;

  let chartMarkup =
    chart.map((table) =>
      <div className={classes.flexItem}>
        <Table students ={table}/>
      </div>);

  return (
    <Paper elevation={2} className={classes.paper}>
      <div className={classes.flexContainer}>
      {chartMarkup}
      </div>
    </Paper>
  )
}

export default Chart
