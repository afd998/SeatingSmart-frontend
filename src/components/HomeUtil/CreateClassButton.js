import React from 'react';
import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {

  }
}));

export default function CreateClassButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.button}>
      <Tooltip title="New Class" placement="top">
        <Link to='/new'>
          <Fab variant="extended"
            size="large"
            color="primary"
            onClick={props.displayCreateClass}>
            <AddIcon />
          </Fab>
        </Link>
      </Tooltip>
    </div>
  )
}
