import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core'
import TextInput from './TextInput';
import SuperList from './SuperList'
import PropTypes from 'prop-types';

import { addClass } from "../redux/actions/dataActions";


const useStyles = makeStyles(theme => ({
  superlist: {
    //padding: "30px"

  },
  icon: {
    margin: theme.spacing(1),

  },
  paper: {
    // minWidth: "400px",
    //width: "50%",
    textAlign: "center",
    //margin: "5% 300px",
    // backgroundColor: '#FAACA8',
    // backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    //backgroundColor: "#CFFFEF",  /* fallback for old browsers */
    //background: "-webkit-linear-gradient(to right, #373B44, #73C8A9)",  /* Chrome 10-25, Safari 5.1-6 */
    //background: "linear-gradient(to right, #373B44, #73C8A9)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    // padding: '30px 0px'
  },
  root: {
    flexGrow: 1,
  },
  title: {
    //margin: "10% 0px",
    textAlign: 'center',
    margin: '0px 0px 20px 0px'

  },

  flexContainer: {
    display: "flex",
    flexDirection: 'column',
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0px auto"
  },
  flexItemText: {
    flexBasis: "40%",
    width: "90%"
  },
  flexItem: {
    margin: "20px 0px"
  },
  flexItemCancel: {
    //flexBasis: "50%",
    textAlign: "center",
    margin: "20px 0px 0px 0px",
    //float: "left"
  },
  flexItemButton: {
    //flexBasis: "50%",
    //margin: "0px 30%",
    textAlign: "center"
    //float: "left"
  },

  textField: {
    margin: '20px 0px 0px 0px',
    textAlign: 'center',
    minWidth: '400px',
    

  },
  textinput: {
    //margin: '20px 0px 0px 0px',
    textAlign: 'center',
    maxWidth: '50px'

  },
}));

function CreateClass(props) {
  let history = useHistory();
  const classes = useStyles();
  const [className, setclassName] = React.useState("");
  const [students_state, setStudents_state] = React.useState({
    columns: [
      {
        title: 'Name', field: 'name',
      },
      { title: 'Gender', field: 'gender', lookup: { 'Male': 'Male', 'Female': 'Female', 'Non-binary': 'Non-binary' } },
      { title: 'Person of Color', field: 'poc', lookup: { 0: 'No', 1: 'Yes' } },
    ],
    data: [],
  });
  const [numberOfGroups, setnumberOfGroups] = React.useState("");
  const [studentsPerGroup, setstudentsPerGroup] = React.useState("");

  const finsishCreateClass = () => {
    let students = students_state.data;
    let newClass = { students, className, numberOfGroups, studentsPerGroup }
    props.addClass(newClass, history);
  }

  return (
    <div className={classes.paper} >
    {/* <Paper elevation={2} className={classes.paper}> */}

        <div className={classes.flexContainer}>
          <div className={classes.flexItemText}>
            <div className={classes.title}>
              <Typography variant="h3"> Create a New Class <span role='img' aria-label="emoji"> 📓</span></Typography>
            </div>
            <TextInput
              numberOfGroups={numberOfGroups}
              setnumberOfGroups={setnumberOfGroups}
              studentsPerGroup={studentsPerGroup}
              setstudentsPerGroup={setstudentsPerGroup}
              className={className}
              setclassName={setclassName} />
          </div>
          <div className={classes.flexItem}>
            <SuperList className={classes.superlist} state={students_state} setState={setStudents_state} />
          </div>
        </div>


        <div>
          <div className={classes.flexItemCancel}>
            <Link to='/'>
              <Button
                size="large"
                aria-label="cancel"
                className={classes.fab}
              >
                <CancelIcon className={classes.icon} />
                   Cancel
            </Button>
            </Link>
          </div>
          <div className={classes.flexItemButton}>
            <Button
              size="large"
              color="primary"

              aria-label="finished"
              className={classes.fab}
              onClick={finsishCreateClass}
            >
              <SaveIcon className={classes.icon} />
                   Finished
            </Button>
          </div>
        </div>


      {/* </Paper > */}
    </div>
  )
}

CreateClass.propTypes = {
  addClass: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

const mapActionToProps = { addClass };

export default connect(mapStateToProps, mapActionToProps)(CreateClass);
