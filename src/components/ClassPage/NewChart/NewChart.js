import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
//MUI STUFF
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import ChartGenerator from './ChartGenerator';
import { addChart } from '../../../redux/actions/dataActions';
import Chart from '../Chart/Chart';

const useStyles = makeStyles(theme => ({
  superlist: {
    //padding: "30px"

  },
  icon: {
    margin: theme.spacing(1),

  },
  paper: {
    //minWidth: "400px",
    padding: "0px 0px",
    margin: "0% 20px",
    // backgroundColor: '#FAACA8',
    // backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    // backgroundColor: "#CFFFEF",  /* fallback for old browsers */
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
    padding: 'px 0px',
    flexBasis: "100%"

  },

  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column"
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
  let history = useHistory();
  const { classroom: { students, numberOfGroups, className } } = props;
  const classes = useStyles();
  const [chartName, setChartName] = React.useState("");
  const [chart, setChart] = React.useState([]);

  const finsishNewChart = (event) => {
    event.preventDefault();
    let data = {
      chart: chart,
      chartName: chartName,
      className: className,
    }
    props.addChart(data, history);

  }

  return (
    <div className={classes.paper}>
      <div className={classes.flexContainer}>
        <div className={classes.flexItemText}>
          <div className={classes.title}>
            <Typography variant="h3"> Create a New Chart</Typography>
          </div>
          <TextInput
            chartName={chartName}
            setChartName={setChartName} />

        </div>
        <div className={classes.flexItem}>
          {(chart.length !== 0) && <Chart chart={{ chart: chart }} />}
          <div className={classes.flexItemButton}>
            <ChartGenerator students={students} numberOfGroups={numberOfGroups} setChart={setChart} />
          </div>
        </div>
        <div>
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
      </div>
    </div>
  )
}

NewChart.propTypes = {
  addChart: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

const mapActionToProps = { addChart };

export default connect(mapStateToProps, mapActionToProps)(NewChart);
