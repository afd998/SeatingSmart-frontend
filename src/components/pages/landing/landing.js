import React from 'react'
import Demo from './Demo'
import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import AppIcon from "../../../images/icon2.png"
import Kids from "../../../images/children2.png"
import Container from "../../util/Container"

import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundSize: "cover",
    backgroundColor: "#454b9e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  h1: {
    margin: "60px 30px 0px 30px",

  },
  h2: {
    margin: "0px 30px 80px 30px",

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  cards: {
    backgroundSize: "cover",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  card: {
    backgroundSize: "cover",
    backgroundColor: "#000000",
    margin: "20px 20px",
    flexBasis: "300px",
    flexShrink: "3",
    minHeight: "200px",
    color: "#FFFFFF"

  },
  title: {
    color: "#F8F32B",
    flexGrow: 1,
  },
  demo: {

  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    AlignContent: "center",
  },
  login: {
    float: "right",
    margin: "0px 10px"
  },
  github: {
    margin: "20px auto",
    padding: "0px 0px 0px 55px"

  },
  body: {
    margin: "20px 0px 0px 0px",

  },

}));
const abstracted = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

}
function Landing() {
  const classes = useStyles();
  return (
    <Container>
      <Typography className={classes.h1} variant='h1'>SeatSmart</Typography>
      <Typography className={classes.h2} variant='h4'> diversity. innovation. transformation.</Typography>
      {/* <img src ="https://img.favpng.com/1/9/21/vector-graphics-stock-photography-cartoon-illustration-image-png-favpng-R7eaku2cK82cWHsSLi2N0mkhJ.jpg"/> */}
      <div className={classes.cards}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} gutterBottom>
              Smart
              </Typography>
            <Typography variant="h5" component="h2">
              Create gender and race-conscious seating charts and teams to increase innovation and productivity.
              </Typography>
            <Typography className={classes.body} variant="body2" component="p">
            Generate random seating charts and teams that don't isolate female students, non-binary students, or students of color.
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card} >
          <CardContent className={classes.content}>
            <Typography className={classes.title} gutterBottom>
              Easy
              </Typography>
            <Typography variant="h5" component="h2">
              Save class rosters and team assignments for convenience and analytics.
              </Typography>
            <Typography className={classes.body} variant="body2" component="p">
              Type in a class roster once, and they're automatically saved, along with all seating charts or team assignments to facilitate learing from data.
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card} >
          <CardContent className={classes.content}>
            <Typography className={classes.title} gutterBottom>
              Free
              </Typography>
            <Typography variant="h5" component="h2">
              No ads. No freemiums.
              </Typography>
            <Typography className={classes.body} variant="body2" component="p">
              Because ads suck and you rock. Click the Github link at the bottom of the page to look at SeatSmart's source code.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Demo />
    </Container>
  )
}

export default Landing
