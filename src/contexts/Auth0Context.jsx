import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Auth0Client } from '@auth0/auth0-spa-js';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';

// constant
let auth0Client;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH0 CONTEXT & PROVIDER ||============================== //

const Auth0Context = createContext(null);

export const Auth0Provider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        auth0Client = new Auth0Client({
          clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
          domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
          authorizationParams: {
            redirect_uri: window.location.origin
          }
        });

        await auth0Client.checkSession();
        const isLoggedIn = await auth0Client.isAuthenticated();

        if (isLoggedIn) {
          const user = await auth0Client.getUser();

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user?.sub,
                email: user?.email
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (options) => {
    await auth0Client.loginWithPopup(options);
    const isLoggedIn = await auth0Client.isAuthenticated();

    if (isLoggedIn) {
      const user = await auth0Client.getUser();
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            id: user?.sub,
            avatar: user?.picture,
            email: user?.email,
            name: user?.name,
            tier: 'Premium'
          }
        }
      });
    }
  };

  const logout = () => {
    auth0Client.logout();

    dispatch({
      type: LOGOUT
    });
  };

  const resetPassword = async () => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <Auth0Context.Provider value={{ ...state, login, logout, resetPassword, updateProfile }}>{children}</Auth0Context.Provider>;
};

Auth0Provider.propTypes = {
  children: PropTypes.node
};

export default Auth0Context;
