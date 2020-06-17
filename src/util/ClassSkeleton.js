import React, { Fragment } from 'react';
//import NoImg from '../images/loading3.png';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  //...theme,
  card: {
    //display: 'flex',
    margin: '10px 10px 10px 10px'
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    width: 100,
    height: 100,
    objectFit: 'cover'
  },
  handle: {
    width: 180,
    height: 18,
   // backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  }
});

const ClassSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 3 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover}  />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ClassSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassSkeleton);
