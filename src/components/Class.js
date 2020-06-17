import React, { Component } from 'react';
import DelClassDialog from './DelClassDialog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
//MUI STUFF
import { ButtonGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import {Card} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  header: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  },
  card: {
    margin: '10px 10px 10px 10px',
    backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%,  rgba(130,205,221,1) 0%, rgba(255,247,153,1) 90% )",
  },
  content: {
    padding: 25,
  },
  delClass: {
    margin: '10px 10px 10px 10px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function Class(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { updateState } = props;
  const {class:{ className,setNumOfGroups, students, createdAt, studentsPerGroup, numberOfGroups, numberOfStudents } } = props;
  const{editClicked}= props;

  dayjs.extend(relativeTime);

  const handleClickDel = () => {
    setOpen(true);
  };
  const handleClickEdit = () => {
    editClicked(className);
    setAnchorEl(null);

  };
  const openSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDel = value => {
    setOpen(false);
  };
  const handleCloseSet = value => {
    setAnchorEl(null);
  };
  const handleDel = value => {
    updateState(className)
    setOpen(false);
  }
  const openSet = Boolean(anchorEl);
  const id = openSet ? 'simple-popover' : undefined;

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <div className={classes.root}>
            <IconButton aria-describedby={id} onClick={openSettings} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Popover
              id={id}
              open={openSet}
              anchorEl={anchorEl}
              onClose={handleCloseSet}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <ButtonGroup orientation="vertical" color="primary" aria-label="outlined primary button group">
            <Button onClick ={handleClickEdit}> Edit </Button>
                <Button>View</Button>
              </ButtonGroup>
            </Popover>
          </div>
        }
        title={<Link to={className} > {className} </Link>}
        subheader={`Created ${dayjs(createdAt).fromNow()}`}
      />
      <CardContent>
        <Typography variant="body1" > {} </Typography>
        <Typography variant="body1" > {numberOfGroups} </Typography>
        <Typography variant="body1" > {studentsPerGroup} </Typography>
      </CardContent>
      <IconButton onClick={handleClickDel} aria-label="delete" className={classes.delClass}>
        <DeleteIcon />
      </IconButton>
      <DelClassDialog nameOfClass={className} open={open} onDel={handleDel} onClose={handleCloseDel} />
    </Card>
  )
}
export default Class;
