import React from 'react';
import DelClassDialog from './DelClassDialog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
//MUI STUFF
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Card} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  header: {
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  },
  card: {
    margin: '10px 10px 10px 10px',
    //backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, rgba(255,247,153,1)  0%, #69f0ae 90% )",
  },
  title: {
    '&:hover': {
      color: 'green',
  },
  },
  delClass: {
    margin: '10px 10px 10px 10px'
  },
}));

export function Class(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { updateState } = props;
  const {class:{ className, createdAt } } = props;

  dayjs.extend(relativeTime);

  const handleClickDel = () => {
    setOpen(true);
  };
  const handleClickEdit = () => {
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
        title={<Link className = {classes.title} to={`/class/${className}`}> {className} </Link>}
        subheader={`Created ${dayjs(createdAt).fromNow()}`}
      />
      <CardContent>
        <Typography variant="body1" > {} </Typography>
        <Typography variant="body1" > {} </Typography>
        <Typography variant="body1" > {} </Typography>
      </CardContent>
      <IconButton onClick={handleClickDel} aria-label="delete" className={classes.delClass}>
        <DeleteIcon />
      </IconButton>
      <DelClassDialog nameOfClass={className} open={open} onDel={handleDel} onClose={handleCloseDel} />
    </Card>
  )
}
export default Class;
