/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { Outlet } from 'react-router-dom';



// components
import Footer from '../../components/Footer';

export default function SwipeableTemporaryDrawer() {


  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <main  style={{ minHeight: '80vh' }}>
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </React.Fragment>
      ))}
    </div>
  );
}