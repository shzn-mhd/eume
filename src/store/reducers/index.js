// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
// import menu from './menu';
import cartReducer from './cart';

import systemAdmin from  './admin';
import systemBooking from './booking';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  // menu,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'mantis-js-'
    },
    cartReducer
  ),
  
  systemAdmin,
  systemBooking
  
});

export default reducers;
