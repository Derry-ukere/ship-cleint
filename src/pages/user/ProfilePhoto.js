/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Alert,Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadAvatar } from '../../components/upload';

// redux
import { useDispatch,useSelector } from '../../redux/store';
import { uploadProfilePic } from '../../redux/slices/uploads/uploadprofilepic';

const UploadProof = () => {
  const dispatch = useDispatch();
  const {error, isLoading, success } = useSelector((state) => state.uploadprofilepic);

  const [file, setFile] = React.useState('');
  const [avatartUrl, setAvatarUrl] = React.useState(null);


  const handleDropAvatar = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setFile(file)
      setAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);




  const uploadFIle =  (e) => {
    e.preventDefault();
    dispatch(uploadProfilePic(file))
  };


  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert  severity="success" sx={{ width: '100%' }}>
            Your Profile Photo  have been uploaded successly !
          </Alert>
        </Snackbar>
        <div className="fade-appear-done fade-enter-done">
          <section className="container row">
            <div className="col l6 s12 offset-l3">
              <h4 className="center">Upload Profile Photo</h4>
              <br />
              <div className="card-panel">
                <form encType="multipart/form-data" onSubmit={uploadFIle}>
                  <div>
                    <div className="file-field input-field">
                    <div className="file-field input-field">
                      <UploadAvatar
                        accept="image/*"
                        file={avatartUrl}
                        onDrop={handleDropAvatar}
                        error = {error}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Upload Profile Picture -- Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of 1mb
                          </Typography>
                        }
                      />
                    </div>
                   
                    </div> 
                  </div>
                  <div>
                  <LoadingButton type="submit" variant="contained" color='info' className="btn btn-full" loading={isLoading}>
                    upload
                </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UploadProof;
