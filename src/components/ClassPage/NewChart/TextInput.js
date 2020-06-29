import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { clearErrors } from '../../../redux/actions/uiActions';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px 0px 20px 0px',
    width: "100%"
  },
}));

function TextInput(props) {

  const { UI: { errors } } = props;
  const classes = useStyles();
  const {chartName, setChartName, } = props;
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
        {(errors) && (errors.chart) && < Typography color='error' variant='body2' > Click Randomize! </Typography>}

      </div>

    </div >
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