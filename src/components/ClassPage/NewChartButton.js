import React from 'react';
import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme => ({
  root: {
    // borderStyle: 'solid',
    //borderWidth: '1px',
    display: "flex",
    justifyContent: "center"
  },
  button: {
   
  },
  text: {
    textAlign: "center",
    flexBasis: "100%",

  }
}));

export default function NewChartButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    {/* <Typography className={classes.text} >Create a New Chart</Typography> */}
      <Tooltip title="New Chart" placement="top">
      <Link to={props.route}>
        <Fab className={classes.button} color="primary" >
          <AddIcon />
        </Fab>
      </Link>
      </Tooltip>
    </div>
  )
}
