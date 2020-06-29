export default {
  SeatSmart: {
    textAlign: "center"
  },
  container: {
   background: 'linear-gradient(45deg, #00c853 30%, #a5d6a7 90%)',
   margin: '20px auto 20px auto',
   height: '150px',
   width: '150px'

  },
  root: {
    background: '#a5d6a7',
  //   border: 0,
  //   borderRadius: 3,
  //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   color: 'white',
  //   height: 48,
  //   padding: '0 30px',
  },
  classesGrid: {
    flexGrow: 1
  },
  
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto',
    height: '150px',
    width: '150px'
  },
  google: {
    margin: '20px auto 20px auto',
    height: '10px',
    width: '10px'
  },
  signup: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '0px 6px 20px 0px'

  },
  button: {
    marginTop: '20',
    position: 'relative'
  },
  customError: {
    margin: '0px 0px 20px auto',
    color: "red",
    fontSize: "1rem"

  },
  progress: {
    position: 'absolute'
  },
  
  palette: {
    type: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#03a9f4',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#fdc92a',
      main: '#fdc92a',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    error:{
      main: "#ff1744"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },

}