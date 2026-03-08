// react
import { Suspense, lazy } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/main';
// components
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
      
        {
          element: (
            <>
              <TrackShipment />
            </>
          ),
          index: true,
        },
      ],
    },
 
  ]);
}

// pages
const TrackShipment = Loadable(lazy(() => import('../pages/TrackShipment')));

