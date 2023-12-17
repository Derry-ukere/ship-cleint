/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import React from 'react'
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const user = useAuth();

  return (
    <div>
  <main className="container" style={{height: '100vh'}}>
  <div className="fade-appear-done fade-enter-done">
    <div className="row">
      <div className="col l6 offset-l3 s12">
        <div className="card-panel">
          <center><img src= {`${user.user.photoURL}`} className="circle" width="150px"  height="150px" /><br /> <br />
            <table className="striped"  style={{marginBottom : '100px'}}>
              <tbody>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>email</td>
                  <td>{user.user.email}</td>
                </tr>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>mobile number</td>
                  <td>{user.profile.mobile_number}</td>
                </tr>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>Name</td>
                  <td>{user.profile.displayName}</td>
                </tr>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>post code</td>
                  <td>{user.profile.post_code}</td>
                </tr>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>city</td>
                  <td>{user.profile.city}</td>
                </tr>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>state</td>
                  <td>{user.profile.state}</td>
                </tr>
                <tr>
                  <td style={{textTransform: 'uppercase'}}>country</td>
                  <td>{user.profile.country}</td>
                </tr>

              </tbody>
            </table>
          </center>
          
         
        </div>
      </div>
    </div>
  </div>
</main>

    </div>
  )
}

export default Profile