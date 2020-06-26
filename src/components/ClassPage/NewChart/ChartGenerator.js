import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CasinoIcon from '@material-ui/icons/Casino';

const useStyles = makeStyles((theme) => ({
  button: {
    background: "red", /* For browsers that do not support gradients */
    background: "-webkit-linear-gradient(left, orange , yellow, green, cyan, blue, violet)", /* For Safari 5.1 to 6.0 */
    background: "-o-linear-gradient(right, orange, yellow, green, cyan, blue, violet)", /* For Opera 11.1 to 12.0 */
    background: "-moz-linear-gradient(right, orange, yellow, green, cyan, blue, violet)", /* For Firefox 3.6 to 15 */
    background: "linear-gradient(to right, orange , yellow, green, cyan, blue, violet)", /* Standard syntax (must be last) */
    textAlign: "center"

  }

}));

function ChartGenerator(props) {
  const { students, numberOfGroups, setChart } = props;
  const classes = useStyles();


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

  const handleClick = (event) => {
    event.preventDefault();
    let localChart = [];
    let numStudents = students.length;
    let numStudentsPerGroup = Math.ceil(numStudents / numberOfGroups)
    let localStudents = students;
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
          localChart[i][j] = {name: "EMPTY", gender: "N/A", POC: "N/A"};
        }
        count++;
      }
    }
    for (let i = 0; i < numberOfGroups; i++) {
      localChart[i] = {i: localChart[i]}
    }
    setChart(localChart);
  }

  return (
    <Button
      variant="contained"
      className={classes.button}
      startIcon={<CasinoIcon />}
      onClick={handleClick}
    >
      RANDOMIZE
    </Button>
  )
}

export default ChartGenerator
