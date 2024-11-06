import { useReducer } from 'react';
import useLocalStorage from './useLocalStorage';
import { decryptData } from 'utils/security';

const useInitializer = () => {
  const [dispatch] = useReducer(authReducer, initialState);
  const { getLocalstorageValue } = useLocalStorage();

  const initilizeLogin = () => {
    // const user = getLocalstorageValue('user');

    const encryptedData = getLocalstorageValue('user');
    const userData = decryptData(encryptedData);

    const dispatchData = {
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user: userData
      }
    };
    dispatch(dispatchData);
  };

  return { initilizeLogin };
};

export default useInitializer;
