import React from 'react'
import { connect } from "react-redux";

import { Dialog, CircularProgress, Backdrop } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deleteClass, deleteChart } from "../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
  message: {
    textAlign: 'center'
  },
  button: {
    textAlign: 'center',
    width: "40%",
    margin: "5% 0% 5% 30%"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function DeleteDialog(props) {
  const classes = useStyles();
  const { onClose, onDel, open, nameOfClass, data } = props;
  const [showDrop, setShowDrop] = React.useState(false);
  const imsure = () => {
    setShowDrop(true);
    if (props.type === "class") {
      props.deleteClass(nameOfClass);

    } else {
      props.deleteChart(data);
    }
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog className={classes.message} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle className={classes.message} id="simple-dialog-title">
        {props.type == "class" ?
          (`Are you sure you want to delete this class?`)
          : (`Are you sure you want to delete this chart?`)}
      </DialogTitle>
      <Typography className={classes.message} variant="body1" >
        {props.type == "class" ?
          (`Deleting a class will delete all of its associated charts.`)
          : ("")}
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={imsure}
      >
        I'm Sure
      </Button>
      <Backdrop className={classes.backdrop} open={showDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog >
  );
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const mapActionToProps = { deleteClass, deleteChart};

const mapStateToProps = (state) => ({
  errors: state.UI.errors
});


export default connect(mapStateToProps, mapActionToProps)(DeleteDialog);
