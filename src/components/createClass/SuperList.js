import React, { forwardRef, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Snackbar, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
//Icons

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { mdiGenderFemale } from '@mdi/js';
const useStyles = makeStyles(theme => ({
  superlist: {
    margin: theme.spacing(5),

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

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function SuperList(props) {
  const classes = useStyles();
  const [displayErrorDialog, setDisplayErrorDialog] = React.useState(false)
  const {liftStudents} = props;
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Gender', field: 'gender', lookup: { 'Male': 'Male', 'Female': 'Female', 'Non-binary': 'Non-binary' } },
      { title: 'Person of Color', field: 'poc',  lookup: { 0: 'No', 1: 'Yes' }},
    ],
    data: [],
  });
 useEffect(() => {
  liftStudents(state.data);
 });
  const showErrorDialog = () => {
    setDisplayErrorDialog(!displayErrorDialog);
  };
  const alert = <Snackbar open={displayErrorDialog} autoHideDuration={6000} onClose={showErrorDialog}>
    <MuiAlert elevation={6} variant="filled" onClose={showErrorDialog} severity="error">
      Each student should have a unique name!
    </MuiAlert>
  </Snackbar>
  return (
    <div className = {classes.superlist}>
      <MaterialTable
        icons={tableIcons}
        title="Students"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  var badCredentials = false
                  for (var student of data) {
                    console.log(student.name);
                    if (newData.name === student.name) {
                      badCredentials = true;
                      showErrorDialog();
                    }
                  }
                  if (badCredentials) {
                    return prevState
                  } else {
                    data.push(newData);
                    return { ...prevState, data };
                  }
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
      {displayErrorDialog && alert}
    </div>
  );
}
