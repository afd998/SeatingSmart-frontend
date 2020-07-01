import React from 'react'
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core'
import { ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderStyle: "solid",
    borderWidth: "5px",
    borderRadius: "25px",
    

  },
  item: {
   
    fontSize: "1px",
    variant: "h6"

  }
}));
function Table(props) {
  const { students } = props;
  console.log("students at this table: ", students);
  const classes = useStyles();
  let listMarkup =
    students.map((student, index) =>
      <div key={index}>
        <ListItem dense ={true}>
          <ListItemText primaryTypographyProps= {{variant: "subtitle2"}} primary={student.name} secondary={`Gender: ${student.gender} POC: ${student.poc === "1" ? ("Yes") : ("No")}`} />
        </ListItem>
      </div>);

  return (
    <div class>
      <List dense={true} disablePadding= {true} className={classes.root}>
        {listMarkup}
      </List>
    </div>
  )
}

export default Table
