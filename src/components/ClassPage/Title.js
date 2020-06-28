import React from 'react'
import PropTypes from 'prop-types';

import {Redirect } from "react-router-dom";
import { changeClassName } from '../../redux/actions/dataActions';
import { connect } from 'react-redux'
import {TextField, IconButton } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  title: {
    //margin: '0 1%',
    padding: "7px",
  },

  titleEdit: {
    margin: '0 1%',
    textAlign: 'center',
    //fontSize: "5008%",
    padding: "19px",
  },

  main: {
    margin: '20px 0px 0px 0px',
    ///display: "inline-block"
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"


  },
  button: {
    //height: "1px",
    //width: "1px"
  },
  buttonChild: {
    // width: "10%",
    //padding: "20px",
  },
  titleChild: {
    // width: "20%",
  }
}));


function Title(props) {
  const { UI: { errors } } = props;
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
    if (title === props.classroom.className) {
      setEditing(false);
      return
    } else {
      var changedClass = Object.assign({}, props.classroom);
      changedClass.oldClassName = props.classroom.className;
      changedClass.className = title;
      props.changeClassName(changedClass, props.replaceClass);
    }
  }


  let ActionButton = editing ?
    (
      <div className={classes.button} >
        <IconButton
          variant="contained"
          size="small"
          className={classes.button}
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </div>
    ) : (
      <div className={classes.button} >
        <IconButton
          variant="contained"
          size="small"
          className={classes.button}
          onClick={handleEdit}
        >
          <EditIcon />

        </IconButton>
      </div>
    )
  let TitleText = editing ?
    (
      <TextField
        className={classes.titleEdit}
        fullWidth={true}
        value={title}
        onChange={handleInput}
        helperText={errors ? errors.className : ""}
        error={errors ? true : false} />
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
      <div className={classes.titleChild}>
        {ActionButton}
        {(editing === false) && <Redirect to={`/class/${title}`} />}
      </div>
    </div>
  )
}

Title.propTypes = {
  UI: PropTypes.object.isRequired,
  changeClassName: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, { changeClassName })(Title);