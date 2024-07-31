// action - state management
import { REGISTER, LOGIN, LOGOUT } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  // user: null
  user: {
    id: null,
    email: null,
    name: null,
    role: null,
    roleName: null,
    rolePermissions: null,
    firstName: null,
    lastName: null
  }
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user, isLoggedIn } = action.payload;
      return {
        ...state,
        isLoggedIn: isLoggedIn,
        isInitialized: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
