import React from 'react'
import onClickOutside from 'react-onclickoutside'
import {Popover} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));



function ClassSettings(props) {
  const {setOpenSet} = props;
  ClassSettings.handleClickOutside = () => setOpenSet(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
   
  </div>
  )
}
const clickOutsideConfig = {
  handleClickOutside: () => ClassSettings.handleClickOutside
};

export default onClickOutside(ClassSettings, clickOutsideConfig)
