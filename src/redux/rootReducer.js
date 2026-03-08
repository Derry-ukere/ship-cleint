import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// shipment
import getShipment from './slices/shipments/getshipment';

// ----------------------------------------------------------------------//

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  getShipment,
});

export { rootPersistConfig, rootReducer };
