import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData (name, score, time) {
  return { name, score, time };
}
const rows = [
  createData('Liam', 460, 32),
  createData('Olivia', 347, 55.3),
  createData('Noah', 234, 19),
  createData('Emma', 210, 30.3),
  createData('Oliver', 188, 40.1),
  createData('Ava', 156, 29.09),
  createData('Elijah', 143, 11.2),
  createData('Charlotte', 123, 93),
  createData('Windy', 100, 88),
  createData('Velvette', 87, 53),
];

function GameResultTable () {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '90%' }}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell> Name </TableCell>
            <TableCell align='right'>Score</TableCell>
            <TableCell align='right'>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.score}</TableCell>
              <TableCell align='right'>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GameResultTable;
