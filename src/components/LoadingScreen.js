import logo from '../assets/ship4wd-logo.png';

export default function LoadingScreen() {
  return (
    <>
      <center className="app-my-3">
        <img src= {logo} className="responsive-img" alt="Logo" style={{ maxHeight: '250px' }} />
        <div className="container">
          <div className="container">
            <div className="progress">
              <div className="indeterminate" />
            </div>
          </div>
        </div>
      </center>
    </>
  );
}
