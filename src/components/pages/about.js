import React from 'react'
import Container from "../util/Container"
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({

  about: {
    margin: "60px auto",
    maxWidth: "700px",
  },

}));

function About() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.about}>
          <Typography variant="h2"> About SeatSmart</Typography>
          <br />

          <Typography variant="h5"> It matters where you sit.  </Typography>
          <br />
   
          <Typography> We believe in the transformative power of teams and equitable engineering.  Innovation is needed now more than ever.  At SeatSmart we understand that diversity matters.  And we understand that educational and professional teams thrive - and maximize results - in safe, diverse, and evolving spaces.
          </Typography>
          <br />
       
          <Typography>
            SeatSmart was inspired by my mom and aunt, both educators, lamenting time spent making diverse seating charts (the routine grouping of educational teams to maximize learning and productivity). One, a teacher at a large public high school, and the other, a professor and researcher of organizational behavior at a major university, understand that diverse groups where neither students or color or females are isolated innovate more and maximize results.  Stanford Psychology Professor Claude Steele’s research on the negative impact of stereotype threat on Black and female performance within white male paradigms supports the need for engineering safe teams.  SeatSmart was born of Steele’s insight that safe team spaces counteract threat and foster excellence in all team members.
          </Typography>
          <br />
  
          <Typography>SeatSmart is a versatile application for educators and managers to randomize group or team membership in a class or company according to diversity characteristics, including race and gender, in order to optimize team learning and deliverables.  Planned iterations include enhanced memory; interface with remote web conference platforms with “breakout group” ability; and data analytics for learning and professional group optimization.
 </Typography>
        </div>

      </Container>
    </div>
  )
}

export default About
