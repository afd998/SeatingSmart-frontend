import React, { Component, forwardRef } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import ChartGenerator from './ChartGenerator';

import Chart from '../Chart/Chart';

const useStyles = makeStyles(theme => ({
  superlist: {
    //padding: "30px"

  },
  icon: {
    margin: theme.spacing(1),

  },
  paper: {
    minWidth: "400px",
    padding: "30px 30px",
    margin: "5% 100px",
    // backgroundColor: '#FAACA8',
    // backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    backgroundColor: "#CFFFEF",  /* fallback for old browsers */
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
    padding: 'px 0px'

  },

  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  flexItemText: {
    flexBasis: "40%",
  },
  flexItem: {
    flexBasis: "40%",
  },
  flexItemCancel: {
    //flexBasis: "50%",
    textAlign: "center",
    margin: "20px 0px 0px 0px",
    //float: "left"
  },
  flexItemButton: {
    //flexBasis: "50%",
    margin: "30px 0%",
    textAlign: "center"
    //float: "left"
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

function NewChart(props) {
  const { students, numberOfGroups } = props;
  const classes = useStyles();
  const [chartName, setChartName] = React.useState("");
  const [chart, setChart] = React.useState([]);

  const finsishNewChart = () => {
    let newClass = { chartName }
  }

  return (
    <div>
      <Paper elevation={2} className={classes.paper}>
        <div className={classes.flexContainer}>
          <div className={classes.flexItemText}>
            <div className={classes.title}>
              <Typography variant="h3"> Create a New Chart</Typography>
            </div>
            <TextInput
              chartName={chartName}
              setChartName={setChartName} />
            <div className={classes.flexItemCancel}>
              <Link to={props.cancelPath}>
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
                onClick={finsishNewChart}
              >
                <SaveIcon className={classes.icon} />
                   Finished
            </Button>
            </div>
          </div>
          <div className={classes.flexItem}>
            <Chart chart={chart} />
            <div className={classes.flexItemButton}>
              <ChartGenerator students={students} numberOfGroups={numberOfGroups} setChart={setChart} />
            </div>
          </div>
        </div>
      </Paper >
    </div>
  )
}

NewChart.propTypes = {
  addClass: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(NewChart);
