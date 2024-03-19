// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
// import menu from './menu';
import cartReducer from './cart';
import university from './university';
import systemAdmin from  './admin';
import accommodation from './accommodation';

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
  university,
  systemAdmin,
  accommodation
  
});

export default reducers;
