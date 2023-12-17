/* eslint-disable no-useless-return */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react'
import { getAuth, updatePassword } from "firebase/auth";
// redux
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const ChangePassword = () => {
  
  const [newPassword, setNewPassword] = React.useState('')
  const [comfirmPassword, setcomfirmPassword] = React.useState('')
  const [successText, setSuccessText] = React.useState('Password succesfully updated')
  const [severity, setSeverity] = React.useState('success')
  const [open, setOpen] = React.useState(false);


    const handleSubmit =(e) => {
        e.preventDefault()
        if (newPassword !== comfirmPassword){
          setSeverity('error');
          setSuccessText('Password must Match')
          setOpen(true);
          return
        }
        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, newPassword).then(() => {
          setOpen(true);
        })
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  return (
  <div style={{marginTop : 40}}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {successText}
          </Alert>
        </Snackbar>
  <main className="container" style={{height: '100vh'}}>
  <div className="fade-appear-done fade-enter-done">
    <div className="row">
      <div className="col l6 offset-l3 s12">
        <div className="card-panel">
          <center>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="input-field">
                <input type="password" id="new_password" name="new_password" autoComplete="new-password" required  value={newPassword} onChange = {(e) => setNewPassword(e.target.value)}/><label className="active" htmlFor="new_password">new password</label></div>
              <div className="input-field">
                <input type="password" id="confirm_new_password" name="confirm_new_password" autoComplete="new-password" required value={comfirmPassword} onChange = {(e) => setcomfirmPassword(e.target.value)} /><label className="active" htmlFor="confirm_new_password">confirm new password</label></div><br />
              <div><button type="submit" className="btn btn-full">Update</button></div>
            </form>
          </center>
        </div>
      </div>
    </div>
  </div>
</main>
    </div>
  )
}

export default ChangePassword