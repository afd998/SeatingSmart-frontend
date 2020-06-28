import React from 'react'
import { Button } from '@material-ui/core';
import PastCharts from './PastCharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    margin: "40px 0px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"

  },
  NewChartButton: {
    flexBasis: "5%",
    width: "5%"

  },
  button: {
    margin: '30px 0px'
  },

  EditWrapper: {
    flexBasis: "40%"

  },

  PastChartsMain: {
    flexBasis: "100%"
  }

}));

function PastChartsMain() {
  const classes = useStyles();
  const [showPast, setShowPast] = React.useState(false);
  const handleHide = () => {
    setShowPast(false)

  }
  const handleShow = () => {
    setShowPast(true);

  }
  let actionButton = !showPast ?
    (<Button variant = "outlined" onClick={handleShow}> Past Charts </Button>) :
    (<div>
      <Button  variant = "outlined" className={classes.button} onClick={handleHide}> Hide Past Charts </Button>
      <PastCharts />
    </div>);

  return (
    <div>
      {actionButton}
    </div>
  )
}

export default PastChartsMain
