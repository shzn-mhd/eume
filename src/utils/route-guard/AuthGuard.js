import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("isLoggedIn>>", isLoggedIn);
  console.log("Auth guard user", user)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
