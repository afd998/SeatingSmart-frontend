import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

//MUI STUFF
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { Fab } from '@material-ui/core';
import { CLEAR_ERRORS } from '../../../redux/types';
import { clearErrors } from '../../../redux/actions/uiActions';
const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px 0px 20px 0px',
    width: "100%"
  },
}));

function TextInput(props) {

  const { UI: { errors } } = props;
  const { liftClassMetaData } = props;
  const classes = useStyles();
  const { numberOfGroups, chartName, setChartName, setnumberOfGroups } = props;
  const handleChange = (event) => {
    switch (event.target.name) {
      case "chartname":
        setChartName(event.target.value);
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
          id='chartname'
          name='chartname'
          type='text'
          label='Chart Name'
          className={classes.textField}
          value={chartName}
          onChange={handleChange}
          helperText={errors ? errors.chartName : false}
          error={(errors && errors.chartName) ? true : false}
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