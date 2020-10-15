import React from 'react';
import DeleteDialog from '../util/DeleteDialog';
import { connect } from "react-redux"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useHistory } from 'react-router-dom';
//MUI STUFF
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { deleteClass } from '../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({
  header: {
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  },
  card: {
    margin: '10px 10px 10px 10px',
    backgroundColor: "#F38D68"

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
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { class: { className, createdAt } } = props;

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
  const handleCloseDel = () => {
    setOpen(false);
  };
  const handleCloseSet = () => {
    setAnchorEl(null);
  };
  
  const goToClass = () => {
    history.push(`/class/${className}`);
  }
  const openSet = Boolean(anchorEl);
  const id = openSet ? 'simple-popover' : undefined;

  return (
    <Card className={classes.card} >
      <CardHeader
        onClick={goToClass}
        title={className}
        subheader={`Created ${dayjs(createdAt).fromNow()}`}
      />
      <CardContent onClick={goToClass}>
        <Typography variant="body1" > {} </Typography>
        <Typography variant="body1" > {} </Typography>
        <Typography variant="body1" > {} </Typography>
      </CardContent>
      <IconButton onClick={handleClickDel} aria-label="delete" className={classes.delClass}>
        <DeleteIcon />
      </IconButton>
      <DeleteDialog type="class" nameOfClass={className} open={open} onClose={handleCloseDel} />
    </Card>
  )
}



export default Class;
