import React from 'react';
import { Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius:"50%",
    border: "3px dashed  #FFFFFF",

   /// width: "5000px",
     height: "60px",
    backgroundColor: "#03a9f4",

  }
}));

export default function CreateClassButton(props) {
  const classes = useStyles();
  return (
    <div >
      <Tooltip title="New Class" placement="top">
        <Link to='/new'>
          <Fab variant="extended"
            size="large"
            color="primary"
            className= {classes.button}
            onClick={props.displayCreateClass}>
            <AddIcon style={{ color: green[50] }}  />
          </Fab>
        </Link>
      </Tooltip>
    </div>
  )
}
