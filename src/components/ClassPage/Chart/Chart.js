import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { deleteChart } from '../../../redux/actions/dataActions';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from './Table';
const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center"

  },

  paper: {
    padding: "20px 20px"

  }
}));
function Chart(props) {
  const classes = useStyles();
  const { chart } = props;
  const data = chart.chart;
  console.log(chart);
  let chartMarkup =
    data.map((table, index) =>
      <div key={index} className={classes.flexItem}>
        <Table students={table.i} />
      </div>);

  let handleClick = () => {
    props.deleteChart({ data: props.chart });
  }
  return (
    <Card className={classes.paper}>
      <CardContent>
        <Typography variant="h4" className={classes.text}> {chart.chartName}</Typography>
        <div className={classes.flexContainer}>
          {chartMarkup}
        </div>
      </CardContent>
      {props.showDel && <CardActions>
        <IconButton onClick={handleClick} size="small">
          <DeleteIcon />
        </IconButton>
      </CardActions>}
    </Card>
  )
}

export default connect(null, { deleteChart })(Chart)
