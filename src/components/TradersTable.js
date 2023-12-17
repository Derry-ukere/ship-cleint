/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';

// redux
import { useDispatch } from '../redux/store';
import { deleteWithdrawal } from '../redux/slices/withdrawals/cancelWithdrawal';

import DepositComp from './WithdrawCom';



export default function BasicTable({users}) {    
    const [dep, setDep] = React.useState([])
    const dispatch = useDispatch();


    const deleteWithdraw = (id, index)=> {
        const LoadedState = [...dep];
        LoadedState[index].loading = true;
        setDep(LoadedState)
        dispatch(deleteWithdrawal(`${id}`)).then(() => {
            const LoadedState = [...dep];
            LoadedState[index].loading = false;
            LoadedState[index].deleted = true;
            setDep(LoadedState)
        })
    }

  const headers = ['Details','Status', 'Address']
  React.useEffect(()=>{
    if(users){
      // console.log('withdrawals', users)
      const cloned = users.map((users) => (
        {
          loading : false,
          deleted : false,
          amount : users.amount,
          from: users.from,
          status : users.status  || ' no status',
          walletAddress : users.walletAddress || "no address", 
          isApproved: users.isApproved,
          id:users.id
        }
      ))
      console.log('cloned', cloned)
      setDep(cloned)
    }
  },[users])

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key = {header} align="left">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!dep? (
            <p>loading ..</p>
          ):
          dep.map((user, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"  align="left">
              <DepositComp   amount={user.amount} destination={user.from} />
              </TableCell>
              <TableCell align="left" >{user.status}</TableCell>
              <TableCell align="left" >{user.walletAddress}</TableCell>
              <TableCell align="center"><LoadingButton  variant="outlined"  disabled = {user.deleted} loading = {user.loading} onClick = {() => deleteWithdraw(user.id, index)}>{user.deleted ? 'Cancelled': "Cancel Withdrawal"}</LoadingButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
