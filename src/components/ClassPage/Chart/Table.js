import React from 'react'
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core'
import { ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderStyle: "solid",
    borderWidth: "5px",
  }

}));
function Table(props) {
  const { students } = props;
  console.log("students at this table: ", students);
  const classes = useStyles();
  let listMarkup =
    students.map((student, index) =>
      <div key={index}>
        <ListItem>
          <ListItemText primary={student.name} secondary={`Gender: ${student.gender}, POC: ${student.poc === "1" ? ("yes") : ("No")}`} />
        </ListItem>
      </div>);

  return (
    <div>
      <List className={classes.root}>
        {listMarkup}
      </List>
    </div>
  )
}

export default Table
