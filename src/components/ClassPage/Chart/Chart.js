import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { Card, CardContent, CardActions, Paper } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { deleteChart } from '../../redux/actions/dataActions';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from '../../util/DeleteDialog';

import Table from './Table';
const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    margin: "10px 0px 10px 0px"

  },

  paper: {
    //padding: "20px 20px"
    backgroundColor: "#17A398"

  },
  flexItem: {
    //flexBasis: "100%",
    flexShrink: "2"
  }
}));
function Chart(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { chart } = props;
  const data = chart.chart;
  console.log(chart);
  let chartMarkup =
    data.map((table, index) =>
      <div key={index} className={classes.flexItem}>
        <Table students={table.i} />
      </div>);

  const handleClick = () => {
    setOpen(true);
  }
  const handleCloseDel = () => {
    setOpen(false);
  }

  return (
    <Paper className={classes.paper} elevation={0} >
      {props.handleClose &&
        <CardContent onClick={props.handleClose}>
          <Typography variant="h5" className={classes.text}> {chart.chartName}</Typography>
          <div className={classes.flexContainer}>
            {chartMarkup}
          </div>
        </CardContent>}
      {!props.handleClose &&
        < CardContent >
          <Typography variant="h5" className={classes.text}> {chart.chartName}</Typography>
          <div className={classes.flexContainer}>
            {chartMarkup}
          </div>
        </CardContent>}

      {
        props.showDel && <CardActions>
          <IconButton onClick={handleClick} size="small">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      }
      <DeleteDialog type="chart" data={{ data: props.chart }} open={open} onClose={handleCloseDel} />
    </Paper >
  )
}

export default connect(null, { deleteChart })(Chart)
