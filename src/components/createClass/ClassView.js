import React from 'react'
import {Table} from '@material-ui/core';
import {TableBody} from '@material-ui/core';
import {TableCell} from '@material-ui/core';
import {TableContainer} from '@material-ui/core';
import {TableHead} from '@material-ui/core';
import {TableRow} from '@material-ui/core';
import {Paper} from '@material-ui/core';


export default function ClassView(props) {
 // const rows = 

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">POC</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}
