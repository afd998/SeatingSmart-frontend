import React from 'react'
import { useParams } from "react-router-dom";
import FourOFour from '../../util/FourOFour';
import ClassPage from '../ClassPage/ClassPage';
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 50,
    maxWidth: 400,
    //margin: "0% 10%",
    display: "inline-block"


  },
  root: {
    //float: "right",
    //flexGrow: 1,
    //maxWidth: 752,
    textAlign: "center"
  },

  button: {
    display: "inline-block"


  },
  title: {
    textAlign: "center",
  },
}));

function ClassRoute(props) {
  const classes = useStyles();
  let classroom;
  let { URLclassName } = useParams();
  const allClasses = props.data? (props.data.classesArray) : ([]);

  if (allClasses.length===0) {
      return <div className={classes.title}> <CircularProgress /> </div>;
  } else {
    let found = false;
    allClasses.forEach(element => {
      if (element.className === URLclassName) {
        classroom = element;
        found = true;
      }
    });
    if (!found) {
      return <FourOFour />;
    } else {
      return (
        <div>
          <ClassPage classroom={classroom} />
        </div>
      )
    }
  }
}

ClassRoute.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, {})(ClassRoute);