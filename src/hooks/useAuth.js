import { useContext } from 'react';

// auth provider
// import AuthContext from 'contexts/JWTContext';
import AuthContext from 'contexts/FirebaseContextUpdated';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("context>>", context);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useAuth;
