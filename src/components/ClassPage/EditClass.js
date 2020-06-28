import React from 'react';
import { connect } from "react-redux";

//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core'
import SuperList from '../createClass/SuperList'
import PropTypes from 'prop-types';

import { editClass } from "../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
  superlist: {

  },
  icon: {
    margin: theme.spacing(1),

  },
  paper: {
    // width: "500px",
    // height: "800px",

    //
    // minHeight: "400px",
    //flexGrow: 1,
   // backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    //margin: "2px 5px 2px 5px",
    textAlign: 'center',

  },
  root: {
    flexGrow: 1,
  },
  title: {
    margin: "0px 60px 60px 60px",
    textAlign: 'center',

  },

  fab: {
    textAlign: 'center',
    margin: 'auto'

  },
  fabAddStudent: {
    margin: "80px auto auto auto",
    textAlign: 'center',

  },

  textField: {
    margin: '20px 0px 0px 0px',
    textAlign: 'center',
    minWidth: '400px'

  },
  textinput: {
    //margin: '20px 0px 0px 0px',
    textAlign: 'center',
    maxWidth: '50px'

  },
}));

function EditClass(props) {
  const { replaceClass, classToEdit } = props;
  const oldClassName = classToEdit.className;
  const classes = useStyles();
  const [className, setclassName] = React.useState(oldClassName);

  const [tableData, setTableData] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Gender', field: 'gender', lookup: { 'Male': 'Male', 'Female': 'Female', 'Non-binary': 'Non-binary' } },
      { title: 'Person of Color', field: 'poc', lookup: { 0: 'No', 1: 'Yes' } },
    ],
    data: classToEdit.students,
  });
  const [numberOfGroups, setnumberOfGroups] = React.useState(classToEdit.numberOfGroups);
  const [studentsPerGroup, setstudentsPerGroup] = React.useState(classToEdit.studentsPerGroup);

  const finsishEditClass = () => {
    let students = tableData.data;
    let newClass = { oldClassName, students, className, numberOfGroups, studentsPerGroup }
    props.editClass(newClass, replaceClass);
    props.setShowEdit(false);
  }
  const handleClick = () => {
    props.setShowEdit(false);
  }
  let cancelButton =
    <Button
      size="large"
      color="secondary"
      aria-label="cancel"
      className={classes.fab}
      onClick={handleClick}
    >
      <CancelIcon className={classes.icon} />
              Cancel
        </Button>

  return (
    <div>
      <Paper className = {classes.paper}>
        <SuperList className={classes.superlist} state={tableData} setState={setTableData} />
        {cancelButton}
        <Button
          size="large"
          aria-label="finished"
          className={classes.fab}
          onClick={finsishEditClass}
        >
          <SaveIcon className={classes.icon} />
                   Finished
        </Button>
      </Paper>
    </div>
  )
}

EditClass.propTypes = {
  editClass: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

const mapActionToProps = { editClass };

export default connect(mapStateToProps, mapActionToProps)(EditClass);
