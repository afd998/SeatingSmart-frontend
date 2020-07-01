import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { TextField } from '@material-ui/core';
import { provideFeedback } from '../redux/actions/dataActions';

const useStyles = makeStyles({

  title: {
    textAlign: "center"
  },
  root: {
    textAlign: "center"
  },
  body: {
    padding: "0px 20px"
  },
  textField: {
    //textAlign: "center",
    //width: "200%",
    display: "inline-block",
    padding: "0px 40px"
  },
  button: {
    display: "inline-block",

    width: "30%",
    margin: "20px 0px 20px 35%",
  },
});


function Feedback(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [message, setMessage] = React.useState("");
  const handleClose = () => {
    onClose();
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const handleSubmit = (e) => {
    props.provideFeedback(message);
    setMessage("");
    onClose();
  
  }

  return (
    <Dialog className={classes.root} onClose={handleClose} open={open}>
      <DialogTitle className={classes.title}>We would love to hear about your expirience!</DialogTitle>
      <Typography variant="body1" className={classes.body}>  Below you can tell us about any issues you've been having with SeatSmart. We are also open to suggestions!.      </Typography>

      <TextField
        fullWidth
        variant='outlined'
        multiline
        rows={6}
        id='messaage'
        name='message'
        type='text'
        //label='Number of Groups'
        className={classes.textField}
        value={message}
        onChange={handleChange}
      // helperText={errors ? errors.numberOfGroups : false}
      //error={(errors && errors.numberOfGroups) ? true : false}
      >
      </TextField>
      <Button onClick={handleSubmit} className={classes.button}>
        SUBMIT
        </Button>
    </Dialog>
  );
}

export default connect(null, { provideFeedback })(Feedback);