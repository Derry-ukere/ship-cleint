/* eslint-disable jsx-a11y/label-has-associated-control */

import { Link } from 'react-router-dom';
import Page from '../components/Page';
import RegisterForm from '../sections/auth/register/RegisterForm';

// 
import {Appdetails} from '../config';


// ----------------------------------------------------------------------

export default function Signin() {
  return (
    <Page title="Sign up">
      <>
        <div className=" row" style={{ minHeight: '100vh' }}>
          <br />
          <div className="col l4 offset-l4 s12">
            <div className="container">
              <Link to="/">
                <br />
                <center>
                  <img
                    src={Appdetails.logo}
                    className="responsive-img"
                    alt="logo"
                    style={{ maxHeight: '150px' }}
                  />
                  <br />
                  <br />
                </center>
              </Link>

              <div className="card-panel" style={{ borderRadius: '10px' }}>
                <center>
                  <br />
                  <RegisterForm />
                  <br />
                  <p>
                    Already have an account? <Link to="/">Sign In</Link>
                  </p>
                </center>
              </div>
            </div>
          </div>
        </div>
      </>
    </Page>
  );
}
