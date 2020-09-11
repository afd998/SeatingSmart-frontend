import React from 'react';
import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  button: {
    margin: "auto 0px"
  }
}));

export default function CreateClassButton(props) {
  const classes = useStyles();
  return (
    <div className = {classes.button} >
      <Tooltip title="New Class" placement="top">
        <Link to='/new'>
          <Fab
            color="primary"
            onClick={props.displayCreateClass}>
            <AddIcon style={{ color: green[50] }}  />
          </Fab>
        </Link>
      </Tooltip>
    </div>
  )
}
