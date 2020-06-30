import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { clearErrors } from '../../redux/actions/uiActions';
const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px 0px 20px 0px',
    width: "30%",
    minWidth: "300px"
  },
}));

function TextInput(props) {

  const { UI: { errors } } = props;
  const classes = useStyles();
  const { numberOfGroups, className, setclassName, setnumberOfGroups } = props;
  const handleChange = (event) => {
    switch (event.target.name) {
      case "classname":
        setclassName(event.target.value);
        break;
      case "numberOfGroups":
        setnumberOfGroups(event.target.value);
        break;
      default:
        break;
    }

  };

  useEffect(() => {
    return () => {
      props.clearErrors();
    }
  }, []);

  return (
    <div>
      <div>
        <TextField
         // variant='filled'
          id='classname'
          name='classname'
          type='text'
          label='Class Name'
          className={classes.textField}
          value={className}
          onChange={handleChange}
          helperText={errors ? errors.className : false}
          error={(errors && errors.className) ? true : false}
        >
        </TextField>
      </div>
      <div>
        <TextField
         // variant='outlined'
          id='numberOfGroups'
          name='numberOfGroups'
          type='text'
          label='Number of Groups'
          className={classes.textField}
          value={numberOfGroups}
          onChange={handleChange}
          helperText={errors ? errors.numberOfGroups : false}
          error={(errors && errors.numberOfGroups) ? true : false}
        >
        </TextField>
      </div>
    </div>
  )
}

TextInput.propTypes = {
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  UI: state.UI
});


export default connect(mapStateToProps, { clearErrors })(TextInput);