import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom';
import AppIcon from "../../images/icon2.png"
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundSize: "cover",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFF0F5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  card: {
    backgroundSize: "cover",
    backgroundColor: "#FFF0F5",
    margin: "20px 20px",
    flexBasis: "300px",
    flexShrink: "3",
    minHeight: "200px"

  },
  title: {

    flexGrow: 1,
  },
  demo: {

  },
  img: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    float: "left"
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
function Container(props) {
  const classes1 = useStyles();
  return (
    <div className={classes1.background}>
      <AppBar position="sticky">
        <Toolbar>
          <div  onClick={abstracted} className={classes1.title}>
            <img
              src={AppIcon}
              alt="app icon"
              className={classes1.img}
              onClick= { () => {window.location.href="/home"}}

            >
            </img>
          </div>

          <Button variant="outlined" className={classes1.login} href={'/about'} color="inherit">About</Button>
          <Button variant="outlined" className={classes1.login} href={'/login'} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {props.children}

      <div className={classes1.github}>
        <iframe src="https://ghbtns.com/github-btn.html?user=afd998&repo=SeatSmart&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
      </div>
    </div >
  )
}

export default Container
