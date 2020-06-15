import React from 'react'
import { Dialog } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  message: {
    textAlign: 'center'
  }
}));

export default function DelClassDialog(props) {
  const classes = useStyles();
  const { onClose, onDel, open } = props;
  const imsure = () => {
    var body = { data: { className: props.nameOfClass } }
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
    axios.delete('/deleteclass', body, {
      headers: { 'content-type': 'application/json', },
    }).then((res) => {
      onDel();
      handleClose();
    }).catch((err) => console.log(err));
  }

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Are you sure you want to delete this class?</DialogTitle>
      <Typography className={classes.message} variant="body1" > Deleting a class will delete all of its associated charts. </Typography>
      <Button
        variant="contained"
        //className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={imsure}
      >
        I'm Sure
      </Button>
    </Dialog >
  );
}

DelClassDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
