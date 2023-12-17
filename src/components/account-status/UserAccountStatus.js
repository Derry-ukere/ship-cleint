/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../Page';
import LoadingScreen from '../LoadingScreen';

import UploadId from '../upload/UploadId';

import { MotionContainer, varBounce } from '../animate';
// assets
import ForbiddenIllustration from '../../assets/illustrations/SeverErrorIllustration';
import useAuth from '../../hooks/useAuth';


// ---------------------------------------------- //

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ------------------------------------------  //

export default function InReview({account_status}) {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleClick = async () => {
       await  logout()
       navigate('/')
    }

    const isValid = account_status === "blocked" || account_status === "suspended" || account_status === "pending"

    console.log('validity', isValid);

  return (
    <Page title="SpringIndex" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{maxWidth : isValid ? 480 : "unset", margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                {account_status === "void" && ('')}
                {account_status === "pending" && ('Account  In Review')}
                {account_status === "suspended" && ('Account suspended')}
                {account_status === "blocked" && ('Account Blocked')} 
                {account_status === "declined" && ('KYC DECLINED')} 
              </Typography>
            </m.div>
            {account_status === 'void' && (
              <LoadingScreen />
            )}

            {account_status === 'suspended' && (
            <Typography sx={{ color: 'text.primary' }}>
            Your account has been suspended for violating our terms of service. Contact us at via the chatbox to discuss reinstatement.            </Typography>
            )}

            { account_status === 'pending' && (
            <Typography sx={{ color: 'text.primary' }}>
            Your account is currently in Review. Review process normally takes up to 48hrs.If you have any questions or concerns please contact us via the chatbox</Typography>
            )}

            {account_status === 'blocked' && (
            <Typography sx={{ color: 'red' }}>
            Your account has been blocked. If you have any questions or concerns please contact us via the chatbox </Typography>
            )}

            {account_status === 'declined' && (
            <Typography sx={{ color: 'red', paddingX : {sm : 12, md : 20} }}>
                    Your account application has been declined. 
                    To proceed with the account opening process, please submit valid and legitimate Identity. 
                    ID card should be cleary scanned.            
            </Typography>
            )}

            {account_status === 'declined' && (
             <UploadId/>
            )}
            {isValid && (<div>
             <m.div variants={varBounce().in}>
              <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </m.div>
             </div>)}
            <>
            <Button  size="large" variant="contained"  style={{marginTop : 8}} component={RouterLink} onClick={handleClick}>
              Go to Home
            </Button>
            </>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

InReview.propTypes = {
    account_status: PropTypes.string,
  };