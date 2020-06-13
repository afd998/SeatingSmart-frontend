import React from 'react'
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { Radio } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(1),

  },
  root: {
    flexGrow: 1,
  },
  title: {
    margin: "2px 2px 2px 2px",
    textAlign: 'center',

  },
  paper: {
    //display: 'flex',
    //margin: "2px 5px 2px 5px",
   // textAlign: 'center',
   padding: 10,

  },
  fab: {
    //margin: theme.spacing(1),
    textAlign: 'center',

  },

  textField: {
    margin: '0px 0px 20px 0px',
    textAlign: 'center',
    minWidth: '300px'

  },
  textinput: {
    //margin: '20px 0px 0px 0px',
    textAlign: 'center',
    maxWidth: '50px'

  },
}));

export default function StudentCreator(props) {
  const [studentName, setStudentName] = React.useState("")
  const [genderValue, setGenderValue] = React.useState("")
  const [poc, setPoc] = React.useState(false)
  const [errors, seterrors] = React.useState({});
  const {submitAddStudent, closeStudentCreator, sameNameMessage, closeSameNameAlert} = props;

  const classes = useStyles();
  const handleChange = (event) => {
    switch (event.target.name) {
      case "studentName":
        setStudentName(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleGenderChange = (event) => {
    setGenderValue(event.target.value)
  };
  
  const handlePocChange = (event) => {
    setPoc(event.target.checked)
  };

  const addStudentClick = (event) =>{
    event.preventDefault();
    const studentDetails = { 
      name: studentName,
      poc: poc,
      gender: genderValue
    }
    submitAddStudent(studentDetails);
  }
  const handleAlertClose = (event) =>{
    closeSameNameAlert(); 
  }
  

  return (
    <Paper className = {classes.paper}>
      <Typography variant="body1"> Create Your Student:</Typography>
      <Snackbar open={sameNameMessage} autoHideDuration={6000} onClose={handleAlertClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity="error">
          Name Already Used!
        </MuiAlert>
      </Snackbar>
      <TextField

        //variant='outlined'
        id='studentName'
        name='studentName'
        type='text'
        label='Name'
        className={classes.textField}
        value={studentName}
        onChange={handleChange}
        helperText={errors.studentName}
        error={errors.studentName ? true : false}
      //fullWidth
      >
      </TextField>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <FormControl >
              <FormLabel>Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={genderValue} onChange={handleGenderChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={poc}
                onChange={handlePocChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Person of Color"
            labelPlacement="Bottom"

          />
        </Grid>
      </Grid>
      <Button
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        className={classes.fabAddStudent}
        onClick= {addStudentClick}
      >
        <AddIcon className={classes.icon} />
                   Add them to the class
      </Button>
      
      <Button
        size="small"
        aria-label="cancel"
        className={classes.fab}
        onClick= {closeStudentCreator}

      >
        <CancelIcon className={classes.icon} />
                   
            </Button>
    </Paper>
  )
}
