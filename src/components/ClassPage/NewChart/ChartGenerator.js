import React from 'react'
import { Link, Button, FormGroup, FormControlLabel, Checkbox, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CasinoIcon from '@material-ui/icons/Casino';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LearnMore from './LearnMore';

const useStyles = makeStyles((theme) => ({
  button: {
    background: "red", /* For browsers that do not support gradients */
    background: "-webkit-linear-gradient(left, orange , yellow, green, cyan, blue, violet)", /* For Safari 5.1 to 6.0 */
    background: "-o-linear-gradient(right, orange, yellow, green, cyan, blue, violet)", /* For Opera 11.1 to 12.0 */
    background: "-moz-linear-gradient(right, orange, yellow, green, cyan, blue, violet)", /* For Firefox 3.6 to 15 */
    background: "linear-gradient(to right, orange , yellow, green, cyan, blue, violet)", /* Standard syntax (must be last) */
    //display: "inline-block",
    width: "150px",
    margin: "20px 0px",


  },
  button2: {
    width: "100px",
    //display: "inline-block"
    margin: "20px 0px 20px 0px",



  },
  link: {
    flexBasis: "100%",


  },
  or: {
    //display: "inline-block"
    margin: "20px 0px 0px 0px",



  },
  flexContainer: {
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"


  },
  form: {
    textAlign: "center",
    margin: "0px 10px 0px 0px"
    ///flexDirection: "column",
    //justifyContent: "center"

  },
  paper: {
    padding: "20px 0px"
  }

}));

function ChartGenerator(props) {
  const { students, numberOfGroups, setChart } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const randomize = () => {
    let localChart = [];
    let numStudents = students.length;
    let numStudentsPerGroup = Math.ceil(numStudents / numberOfGroups)
    let localStudents = JSON.parse(JSON.stringify(students));
    localStudents = shuffle(localStudents);
    for (var i = 0; i < numberOfGroups; i++) {
      localChart[i] = new Array(numStudentsPerGroup);
    }
    let count = 0;
    for (let j = 0; j < numStudentsPerGroup; j++) {
      for (let i = 0; i < numberOfGroups; i++) {
        if (count < numStudents) {
          localChart[i][j] = localStudents[count];
        } else {
          localChart[i][j] = { name: "EMPTY", gender: "N/A", POC: "N/A" };
        }
        count++;
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      localChart[i] = { i: localChart[i] }
    }
    localChart = shuffle(localChart);
    setChart(localChart);
  }


  const handleGo = (event) => {
    event.preventDefault();
    if (state.checkedA && state.checkedB) {

      genderAndPoc();
    }
    else if (state.checkedA && !state.checkedB) {

      gender();
    }
    else if (!state.checkedA && state.checkedB) {

      poc();
    }
    else {

      randomize(event);
    }
  }

  const genderAndPoc = () => {
    let compare = (a, b) => {
      if (a.length <= b.length) {
        return -1;
      }
      return 1;
    }
    let localChart = [];
    let numStudents = students.length;
    let numStudentsPerGroup = Math.ceil(numStudents / numberOfGroups);
    if (numStudentsPerGroup === 1) {
      randomize();
      return;
    }
    for (var i = 0; i < numberOfGroups; i++) {
      localChart[i] = [];
    }
    let localStudents = JSON.parse(JSON.stringify(students));
    localStudents = shuffle(localStudents);

    let whiteGirls = localStudents.filter((student) => (student.gender !== "Male" && student.gender !== "1"));
    let whiteGuys = localStudents.filter((student) => (student.gender === "Male" && student.gender !== "1"));
    let pocGuys = localStudents.filter((student) => (student.gender === "Male" && student.gender === "1"));
    let pocGirls = localStudents.filter((student) => (student.gender !== "Male" && student.gender === "1"));


    localChart.sort(compare);
    if (pocGuys.length % 2 === 1) {
      localChart[0].push(pocGuys.pop());
    }
    while (pocGuys.length !== 0) {
      for (let i = 0; i < numberOfGroups; i++) {
        if (pocGuys.length !== 0 && localChart[i].length < numStudentsPerGroup - 1) {
          localChart[i].push(pocGuys.pop());
          localChart[i].push(pocGuys.pop());
        }
      }
    }

    localChart.sort(compare);
    if (whiteGirls.length % 2 === 1) {
      localChart[0].push(whiteGirls.pop());
    }
    while (whiteGirls.length !== 0) {
      for (let i = 0; i < numberOfGroups; i++) {
        if (whiteGirls.length !== 0 && localChart[i].length < numStudentsPerGroup - 1) {
          localChart[i].push(whiteGirls.pop());
          localChart[i].push(whiteGirls.pop());
        }
      }
    }

    while (pocGirls.length !== 0) {
      for (let i = 0; i < numberOfGroups; i++) {
        if (pocGirls.length !== 0 && localChart[i].length < numStudentsPerGroup - 1 && localChart[i].length !== 0) {
          localChart[i].push(pocGirls.pop());
        }
      }
    }

    for (let i = 0; i < numberOfGroups; i++) {
      while (localChart[i].length < numStudentsPerGroup - 1) {
        localChart[i].push(whiteGuys.pop());
      }
    }

    localChart = shuffle(localChart);
    for (let i = numberOfGroups - 1; i >= 0; i--) {
      if (localChart[i].length < numStudentsPerGroup && whiteGuys.length !== 0) {
        localChart[i].push(whiteGuys.pop());
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      while (localChart[i].length < numStudentsPerGroup) {
        localChart[i].push({ name: "EMPTY", gender: "N/A", POC: "N/A" });
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      localChart[i] = { i: localChart[i] }
    }
    setChart(localChart);
  }

  const gender = () => {
    let localChart = [];
    let numStudents = students.length;
    let numStudentsPerGroup = Math.ceil(numStudents / numberOfGroups);
    if (numStudentsPerGroup === 1) {
      randomize();
      return;
    }
    for (var i = 0; i < numberOfGroups; i++) {
      localChart[i] = [];
    }
    let localStudents = JSON.parse(JSON.stringify(students));
    localStudents = shuffle(localStudents);
    let nonMales = localStudents.filter((student) => student.gender !== "Male");
    let males = localStudents.filter((student) => student.gender === "Male");
    if (nonMales.length % 2 === 1) {
      localChart[0].push(nonMales.pop());
    }
    while (nonMales.length !== 0) {
      for (let i = 0; i < numberOfGroups; i++) {
        if (nonMales.length !== 0 && localChart[i].length < numStudentsPerGroup - 1) {
          localChart[i].push(nonMales.pop());
          localChart[i].push(nonMales.pop());
        }
      }
    }

    for (let i = 0; i < numberOfGroups; i++) {
      console.log(localChart[i].length);
      while (localChart[i].length < numStudentsPerGroup - 1) {
        localChart[i].push(males.pop());
      }
    }

    localChart = shuffle(localChart);
    for (let i = numberOfGroups - 1; i >= 0; i--) {
      if (localChart[i].length < numStudentsPerGroup && males.length !== 0) {
        localChart[i].push(males.pop());
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      while (localChart[i].length < numStudentsPerGroup) {
        localChart[i].push({ name: "EMPTY", gender: "N/A", POC: "N/A" });
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      localChart[i] = { i: localChart[i] }
    }
    setChart(localChart);

  }


  const poc = () => {
    let localChart = [];
    let numStudents = students.length;
    let numStudentsPerGroup = Math.ceil(numStudents / numberOfGroups)
    if (numStudentsPerGroup === 1) {
      randomize();
      return;
    }
    for (var i = 0; i < numberOfGroups; i++) {
      localChart[i] = [];
    }
    let localStudents = JSON.parse(JSON.stringify(students));
    localStudents = shuffle(localStudents);
    let pocs = localStudents.filter((student) => student.poc !== "0");
    let whites = localStudents.filter((student) => student.poc === "0");
    if (pocs.length % 2 === 1) {
      localChart[0].push(pocs.pop());
    }
    console.log("here");

    while (pocs.length !== 0) {
      for (let i = 0; i < numberOfGroups; i++) {
        console.log("here");
        if (pocs.length !== 0 && localChart[i].length < numStudentsPerGroup - 1) {
          console.log("here");
          localChart[i].push(pocs.pop());
          localChart[i].push(pocs.pop());
        }
      }
    }
    console.log("here");
    for (let i = 0; i < numberOfGroups; i++) {
      console.log(localChart[i].length);
      while (localChart[i].length < numStudentsPerGroup - 1) {
        localChart[i].push(whites.pop());
      }
    }
    localChart = shuffle(localChart);
    for (let i = numberOfGroups - 1; i >= 0; i--) {
      if (localChart[i].length < numStudentsPerGroup && whites.length !== 0) {
        localChart[i].push(whites.pop());
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      while (localChart[i].length < numStudentsPerGroup) {
        localChart[i].push({ name: "EMPTY", gender: "N/A", POC: "N/A" });
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      localChart[i] = { i: localChart[i] }
    }
    setChart(localChart);
    return;
  }


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.flexContainer}>
      <Paper className={classes.paper}>
        <div className={classes.flexContainer}>

          {/* <FormGroup column className={classes.FormGroup}> */}
          <FormControlLabel
            control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Don't isolate non-males"
          />
          <FormControlLabel className={classes.form}
            control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
            label="Don't isolate people of color"
          />
          {/* </FormGroup> */}
          <Button
            variant="contained"
            className={classes.button2}
            startIcon={<PlayArrowIcon />}
            onClick={handleGo}
          >
            GO
          </Button>
          <Link className={classes.link} color="primary" onClick={handleClickOpen}>
            Learn More
          </Link>
          <LearnMore open={open} onClose={handleClose} />
        </div>
      </Paper>
      <Typography elevation={10} className={classes.or}>- OR -</Typography>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<CasinoIcon />}
        onClick={randomize}
      >
        RANDOMIZE
    </Button>

    </div>
  )
}

export default ChartGenerator
