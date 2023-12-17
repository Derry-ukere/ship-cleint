/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import React from 'react';
import { getAuth } from 'firebase/auth';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuth from '../../hooks/useAuth';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAllTrader } from '../../redux/slices/traders/getTraders';
import { copyTrader } from '../../redux/slices/traders/copyTrader';

const Experts = () => {
  const dispatch = useDispatch();
  const { allTraders } = useSelector((state) => state.allTraders);
  const { success } = useSelector((state) => state.copyTraderReducer);

  const { deposits } = useAuth();
  const [error, setError] = React.useState(false);
  const [container, setContainer] = React.useState(null)

  React.useEffect(() => {
    dispatch(getAllTrader())
  }, [])

  React.useEffect(() => {
    if (allTraders) {
      const cloned = allTraders.map((trader) => (
        {
          loading: false,
          copied: trader.subscribers.includes(auth.currentUser.uid),
          wins: trader.wins,
          losses: trader.losses,
          winRate: trader.winRate,
          lossRate: trader.lossRate,
          imageUrl: trader.imageUrl,
          id: trader.id,
          name: trader.name
        }
      ))
      setContainer(cloned)
    }
  }, [allTraders])


  const UpdateStatus = (id, index, deposits) => {
    if ((deposits === 0)) {
      setError(true)
      return
    }
    const LoadingState = [...container];
    LoadingState[index].loading = true;
    setContainer(LoadingState)

    dispatch(copyTrader(id)).then((res) => {
      const LoadingState = [...container];
      LoadingState[index].loading = false;
      LoadingState[index].copied = res === 'Copied';
      setContainer(LoadingState)
    })
  }



  const auth = getAuth();


  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            Deposit account before you copy a trader !
          </Alert>
        </Snackbar>
        <div className="fade-appear-done fade-enter-done">
          <div className="row">
            <center>
              <b>COPY EXPERT TRADERS</b>
            </center>
            <br />
            <div className="col l6 s12 offset-l3">
              <ul className="collection" style={{ marginBottom: 50 }}>
                {!container ? (
                  <p>loading traders ...</p>
                ) :
                  container.map((trader, index) => (
                    <div className="collection-item" key={trader.id}>
                      <div className="row">
                        <div className="col l3 s4 center">
                          <p style={{ fontWeight: 'bold' }}>{trader.name}</p>
                          <img
                            src={trader.imageUrl}
                            className="circle"
                            style={{ maxHeight: '100px' }}
                          />
                        </div>
                        <div className="col l7 s5" >
                          <span>{trader.wins} Wins</span>
                          <br />
                          <span>{trader.losses} Losses</span>
                          <br />
                          <span>{trader.winRate} Win Rate</span>
                          <br />
                          <span>20% Profit Share</span>
                          <br />
                          <br />
                          <b>
                            <LoadingButton variant="contained" color={trader.copied ? 'error' : 'success'} loading={trader.loading} onClick={() => UpdateStatus(trader.id, index, deposits)}>{trader.copied ? 'Copied' : "Copy Trader"}</LoadingButton>
                          </b>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="col l2 s3" >
                          <br />
                          <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experts;
