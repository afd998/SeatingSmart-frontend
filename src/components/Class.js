import React, { Component } from 'react';
import DelClassDialog from './DelClassDialog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//MUI STUFF
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CardHeader } from '@material-ui/core';;


const styles = {
  header: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  },
  card: {
    margin: '10px 10px 10px 10px'
  },
  content: {
    padding: 25,
  },
  delClass: {
    margin: '10px 10px 10px 10px'
  }
}

export function Class(props) {

  const [open, setOpen] = React.useState(false);
  const { updateState } = props;
  const { classes, class: { className, userId, setNumOfGroups, students, createdAt, studentsPerGroup, numberOfGroups, numberOfStudents } } = props;
  dayjs.extend(relativeTime);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };
  const handleDel = value => {
    updateState(className)
    //setOpen(false);
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={className}
        subheader={`Created ${dayjs(createdAt).fromNow()}`}
      />
      <CardContent>
        <Typography variant="body1" > {numberOfStudents} </Typography>
        <Typography variant="body1" > {numberOfGroups} </Typography>
        <Typography variant="body1" > {studentsPerGroup} </Typography>
      </CardContent>
      <IconButton onClick={handleClickOpen} aria-label="delete" className={classes.delClass}>
        <DeleteIcon />
      </IconButton>
      <DelClassDialog nameOfClass={className} open={open} onDel={handleDel} onClose={handleClose} />
    </Card>
  )
}
export default withStyles(styles)(Class);
