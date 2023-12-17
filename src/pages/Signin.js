/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import LoginForm from '../sections/auth/login/LoginForm';
import logoSvg from '../assets/ship4wd-logo.png';




// ----------------------------------------------------------------------

export default function Signin() {



  return (
    <Page title="Sign in">
      <>
        <div className=" row" style={{ minHeight: '100vh' }}>
          <br />
          <div className="col l4 offset-l4 s12">
            <div className="container">
              <Link to="/">
                <br />
                <center>
                  <img
                    src={logoSvg}
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
                  <LoginForm />
                  <br />
                </center>
              </div>
            </div>
          </div>
        </div>
      </>
    </Page>
  );
}
