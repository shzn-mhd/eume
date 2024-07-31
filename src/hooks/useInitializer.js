import { useReducer } from 'react';
import useLocalStorage from './useLocalStorage';

const useInitializer = () => {
  const [dispatch] = useReducer(authReducer, initialState);
  const {getLocalstorageValue} = useLocalStorage();

  const initilizeLogin = () => {
    const user = getLocalstorageValue("user");
    const dispatchData = {
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: JSON.parse(user)
        }
      }
    dispatch(dispatchData)
  };

  return {initilizeLogin}
};

export default useInitializer;
