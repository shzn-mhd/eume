// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
// import menu from './menu';
import cartReducer from './cart';
import systemAdmin from  './admin';
import room from './room';
import accommodation from './accommodation';
import offer from './offer';

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
  accommodation,
  offer,
  room,
  accommodation,
  systemAdmin,
  accommodation,
  offer
  
});

export default reducers;
