/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Container } from '@mui/material';

import useAuth from '../hooks/useAuth';

import Page404 from '../components/account-status/UserAccountStatus'


// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  const { user } = useAuth();  
  const {account_status} = user
  // Logic here to get current user role
  return account_status;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();
    console.log('account_status', currentRole)
  if (!accessibleRoles.includes(currentRole)) {  
    return (
      <Container>
        <Page404  account_status = {currentRole}/>
      </Container>
    );
  }

  return <>{children}</>;
}
