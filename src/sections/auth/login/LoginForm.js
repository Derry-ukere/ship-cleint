/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getshipment } from '../../../redux/slices/shipments/getshipment';

import ShipmentCard from '../../../components/ShipmentCard';

const LoginForm = () => {

  const dispatch = useDispatch();
  const { shipment, error, isLoading } = useSelector((state) => state.getShipment);
  


  const [defaultValues, setDefaultValues] = React.useState({
    trackingId: '',
  });

  React.useEffect(() => {
    console.log({
      shipment,error, isLoading
    })
  },[shipment,error, isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(getshipment(defaultValues.trackingId));
    setDefaultValues({
      ...defaultValues,
      trackingId: "",
    })
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="input-field">
          <label htmlFor="email">Enter Tracking ID</label>
          <input
            id="trackingId"
            name="trackingId"
            required
            type="text"
            value={defaultValues.trackingId}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                trackingId: e.target.value,
              })
            }
          />
        </div>

        <div>
        <LoadingButton type="submit"  variant="contained"  color='info' className="btn btn-full" loading = {isLoading}>
          Track Shipment
        </LoadingButton>
       {shipment && <ShipmentCard ShipmentDetails = {shipment} /> }
        </div>
      </form>
    </>
  );
};

export default LoginForm;





