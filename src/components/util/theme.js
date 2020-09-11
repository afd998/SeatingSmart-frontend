
export default {
  typography: {
    fontFamily: [
      
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 20,
    baseLineHeight: 10,
    headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],

  },
  SeatSmart: {
    textAlign: "center"
  },
  container: {
    //background: 'linear-gradient(45deg, #00c853 30%, #a5d6a7 90%)',
    margin: '20px 0px 20px 0px',
    height: '150px',
    width: '150px'

  },
  demoContainer: {
    //background: 'linear-gradient(45deg, #00c853 30%, #a5d6a7 90%)',
    //margin: '200px 0px 20px 0px',


    height: '100%',
    //width: '150px'
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  demo: {

  },
  container: {
    //background: 'linear-gradient(45deg, #00c853 30%, #a5d6a7 90%)',
    margin: '20px 0px 20px 0px',
    height: '150px',
    width: '150px',

  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  root: {
    //background: '#a5d6a7',
    //   border: 0,
    //   borderRadius: 3,
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //   color: 'white',
    //   height: 48,

  },
  classesGrid: {
    flexGrow: 1
  },

  form: {
    textAlign: 'center',
    padding: '20px 20px 0px 20px'
  },
  
  signup: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '0px 30px 20px 0px',
    textAlign: "center"


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
      main: '#000000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#ffffff',
      main: '#2B2D42',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    error: {
      main: "#ff1744"
    },
    action: {
      main: "#ffffff"
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