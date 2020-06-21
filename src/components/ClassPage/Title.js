import React from 'react'
import { Route, Switch, Redirect, useRouteMatch, Link } from "react-router-dom";
import EditClass from './EditClass';
import { editClass } from '../../redux/actions/dataActions';
import { connect } from 'react-redux'
import { Button, InputBase, Grid, TextField, IconButton } from '@material-ui/core'
import { Input } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  title: {
    margin: '0 1%',
    padding: "7px",

  },
  titleEdit: {
    margin: '0 1%',
    textAlign: 'center',
    //fontSize: "5008%",
    padding: "19px",


  },
  main: {
    margin: '10px 10px 10px 10px',
    ///display: "inline-block"

  },
  button: {
  },
  buttonChild: {
    width: "10%",
    float: "left",
    padding: "20px",
    display: "inline-block",
    //border: "2px solid red",
  },
  titleChild: {
    //display: "inline",
    width: "20%",
    float: "left",
    //border: "2px solid red",
  },
  delClass: {
    margin: '10px 10px 10px 10px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function Title(props) {
  const classes = useStyles();
  const [editing, setEditing] = React.useState("");
  const [title, setTitle] = React.useState(props.classroom.className);
  const [error, setError] = React.useState("");

  let handleEdit = () => {
    setEditing(true);

  }
  let handleInput = (event) => {
    setEditing(true);
    setTitle(event.target.value)

  }
  let handleSave = () => {
    if (title.includes("$") ||
      title.includes("&") ||
      title.includes("+") ||
      title.includes("/") ||
      title.includes(",") ||
      title.includes(":") ||
      title.includes(";") ||
      title.includes("=") ||
      title.includes("?") ||
      title.includes("@")) {
      setError("Must not include special characters");
      return;
    }
    let changedClass = props.classroom;
    if (title === props.classroom.className) {
      setEditing(false);
      return
    } else {
      changedClass.oldClassName = props.classroom.className;
      changedClass.className = title;
      props.editClass(changedClass, props.replaceClass);
      setEditing(false);
    }
  }


  let ActionButton = editing ?
    (
      <div className={classes.button} >
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={handleSave}
        >
          <SaveIcon />
        </Button>
      </div>
    ) : (
      <div className={classes.button} >
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </div>
    )
  let TitleText = editing ?
    (
      <TextField
        className={classes.titleEdit}
        fullWidth={true}
        value={title}
        onChange={handleInput}
        helperText={error}
        error={error ? true : false} />
      // <InputBase
      //   className={classes.titleEdit}
      //   defaultValue={props.classroom.className} />
    ) : (
      <Typography
        className={classes.title}
        variant="h3"> {title}
      </Typography>
    );

  return (
    <div className={classes.main}>
      <div className={classes.titleChild}>
        {TitleText}
      </div>
      <div className={classes.buttonChild}>
        {ActionButton}
        {(editing === false) && <Redirect to={`/class/${title}`} />}
      </div>
    </div>
  )
}


export default connect(null, { editClass })(Title);