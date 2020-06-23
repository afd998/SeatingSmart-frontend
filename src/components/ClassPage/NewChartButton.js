import React from 'react';
import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
const useStyles = makeStyles(theme => ({
  plus: {
    margin: '50px 0px 20px 0px',
  }
}));

export default function NewChartButton(props) {
  const classes = useStyles();
  return (
    <Link to={props.route}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<FiberNewIcon />}
      >
        New Chart
    </Button>
    </Link>
  )
}
