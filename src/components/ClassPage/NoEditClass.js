import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 50,
    maxWidth: 400,
    //margin: "0% 10%",
    display: "inline-block"


  },
  root: {
    //float: "right",
    //flexGrow: 1,
    //maxWidth: 752,
    textAlign: "center"
  },

  button: {
    display: "inline-block"


  },
  title: {
    textAlign: "center",
  },
}));





export default function SimpleTable(props) {
  const classes = useStyles();
  console.log(props.classToEdit);
  const rows = props.classToEdit.students;
  const handleClick = () => {
    props.setShowEdit(true);
  }
  return (
    <div className={classes.root} >


      <TableContainer className={classes.table} component={Paper}>
        <Typography variant="h5" className={classes.title}> Students </Typography>

        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">POC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.poc === '1' ? ('Yes') : ('No')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          size="large"
          color="primary"
          aria-label="cancel"
          className={classes.button}
          onClick={handleClick}
        >
          <EditIcon />
           Edit
     </Button>
      </TableContainer>
    </div>

  );
}
