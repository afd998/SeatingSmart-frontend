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
  const classes = useStyles();
  let listMarkup =
    students.map((student) =>
      <div>
        <ListItem>
          <ListItemText primary={student.name} secondary={student.gender} />
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
