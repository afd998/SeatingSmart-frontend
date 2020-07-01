import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, IconButton, Fab, CardContent } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ChartGenerator from '../../ClassPage/NewChart/ChartGenerator';
import Chart from '../../ClassPage/Chart/Chart';
import Students from './students';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "50% 0px 20px 0px"
  },
  card: {
    margin: "0px 0px 0px 0px"
  }
}));
function Demo() {
  const classes = useStyles();
  const [students, setStudents] = React.useState(Students);
  const [numberOfGroups, setNumberOfGroups] = React.useState(6);
  const [className] = React.useState("Classroom Groups");
  const [chart, setChart] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  let demo =
    <div className={classes.card}>
      <Card>
        <CardHeader titleTypographyProps={{ align: "left" }}
          subheaderTypographyProps={{ align: "justify" }}
          action={
            <IconButton aria-label="settings" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
          title="Try creating some groups..."
          subheader="Demonstration"
        />
        <CardContent>
          <ChartGenerator
            type="demo"
            students={students}
            numberOfGroups={numberOfGroups}
            setChart={setChart} />
          {(chart.length !== 0) && <Chart chart={{ chart: chart }} />}
        </CardContent>
      </Card>
    </div>
  let button = <Fab 
  variant="extended" 
  className={classes.button} 
  onClick={handleOpen}
  >
    <PlayArrowIcon className={classes.extendedIcon} />
      Show Me a Demo
      </Fab>


  return (
    <div>
      {open && demo}
      {!open && button}
    </div>
  )
}

export default Demo
