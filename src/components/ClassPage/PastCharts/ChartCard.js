import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Chart from "../Chart/Chart";

const useStyles = makeStyles((theme) => ({

  title: {
    margin: '0 1%',


  },
  form: {
    margin: 'auto auto auto auto%',


  },
  titleEdit: {
    margin: '0 1%',
    textAlign: 'center',
    fontSize: "338%"

  },
  card: {
    margin: '10px 10px 10px 10px',
    backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%,  rgba(130,205,221,1) 0%, rgba(255,247,153,1) 90% )",
  },
  content: {
    padding: 25,
  },
  button: {
    display: "inline-block"
  },
  root: {
    textAlign: "center"
  }
}));

function ChartCard(props) {
  const [showChart, setShowChart] = React.useState(false);
  dayjs.extend(relativeTime);
  const classes = useStyles();
  console.log("props", props);
  const handleOpen = () => {
    setShowChart(true);
  }
  const handleClose = () => {
    setShowChart(false);
  }

  const { chartName, createdAt, chart } = props.chart;
  let markup = showChart ?
    (<Paper className={classes.root}><Chart showDel chart={props.chart} />
      <Button className={classes.button} onClick={handleClose}> Close </Button></Paper>) :
    (
      <Card onClick={handleOpen} className={classes.root} variant="outlined" >
        <CardContent>
          <Typography variant="h5" component="h2">
            {chartName}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {`Created ${dayjs(createdAt).fromNow()}`}
          </Typography>
        </CardContent >
      </Card >);


  return (
    <div>{markup}
    </div>
  )
}

export default ChartCard
