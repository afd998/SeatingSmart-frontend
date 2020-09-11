import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, IconButton, Fab, CardContent } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ChartGenerator from '../../ClassPage/NewChart/ChartGenerator';
import Chart from '../../ClassPage/Chart/Chart';
import Students from './Students';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "center",
    margin: "100px auto 100px auto",
  },
  card: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",

  },
  wrap: {

    margin: "30px 20px",
    backgroundColor: "#FFFFFF"
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
    <div >
      <Card className={classes.wrap}>
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
  let button = <div className = {classes.button}> <Fab
    variant="extended"

    onClick={handleOpen}
  >
    <PlayArrowIcon className={classes.extendedIcon} />
      Show Me a Demo
      </Fab>
  </div>


  return (
    <div>
      {open && demo}
      {!open && button}
    </div>
  )
}

export default Demo
