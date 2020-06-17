import React from 'react';
import { Fab } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  plus: {
    margin: '50px 0px 20px 0px',
  }
}));

export default function CreateClassButton(props) {
  const classes = useStyles();
  return (
    <Grid item xs={2} className={classes.plus} >
      <Tooltip title="New Class" placement="top">
        <Link to='/newclass'>
          <Fab variant="extended"
            size="large"
            color="primary"
            aria-label="add"
            onClick={props.displayCreateClass}>
            <AddIcon />
          </Fab>
        </Link>
      </Tooltip>
    </Grid>
  )
}
