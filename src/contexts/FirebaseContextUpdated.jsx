// FirebaseContext.js
import React, { createContext, useContext, useReducer, useState } from 'react';
import { getFirestore, doc,  collection, query, where, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { app, db } from 'config/firebase';
import authReducer from 'contexts/auth-reducer/auth';
import { v4 as uuidv4 } from 'uuid';

import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';

const FirebaseContext = createContext({
  isLoggedIn: false,
  isInitialized: false,
  login: async (email, password) => {
    console.error('FirebaseContext not yet initialized');
    return { success: false, message: 'FirebaseContext not yet initialized' };
  },
  logout: () => {},
  firebaseRegister: async (email, password, firstName, lastName, role) => {
    console.error('FirebaseContext not yet initialized');
    return { success: false, message: 'FirebaseContext not yet initialized' };
  },
  user: null
});

export const useFirebase = () => useContext(FirebaseContext);

const initialState = {
  isLoggedIn: false,
  isInitialized: true,
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

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { isLoggedIn } = state;
  const isInitialized = true;

  const login = async (email, password) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const firestore = getFirestore(app);
        let roleName = [];
        let rolePermissions = {};

        // Fetch role documents based on user roles
        const rolePromises = userData.role.map(async (roleId) => {
          const roleDocRef = doc(firestore, 'roles', roleId);
          const roleDocSnapshot = await getDoc(roleDocRef);
          if (roleDocSnapshot.exists()) {
            const roleData = roleDocSnapshot.data();
            roleName.push(roleData.roleName);
            rolePermissions = { ...rolePermissions, ...roleData.permissions }; // Merge permissions
          }
        });

        // Wait for all role documents to be fetched
        await Promise.all(rolePromises);
        const dispatchData = {
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              id: userData.uid,
              email: userData.email,
              name: userData.displayName || 'Stebin Ben',
              role: userData.role || '',
              roleName: roleName,
              rolePermissions: rolePermissions,
              firstName: userData.firstName || '',
              lastName: userData.lastName || ''
            }
          }
        }
        dispatch(dispatchData);
        console.log("dispatchData>>", dispatchData);
        setUser(dispatchData.payload.user);

        return { success: true, data: userData };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, message: 'Failed to log in' };
    }
  };

  const logout = () => {
    setUser(null);
    dispatch({
      type: LOGOUT,
      payload: {
        isLoggedIn: false,
        user: null
      }
    });
  };

  const firebaseRegister = async (email, password, firstName, lastName, role) => {
    const firestore = getFirestore(app);
    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // const user = userCredential.user;

    // Store additional user information in Firestore
    const uuid = uuidv4();
    const userDoc = doc(firestore, 'users', uuid);
    await setDoc(userDoc, {
      uid: uuid,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role
    });
    // get saved user and return
    const userDocSnapshot = await getDoc(userDoc);
    console.log("userDocSnapshot>>", userDocSnapshot.data());
    return userDocSnapshot.data();
  };

  return <FirebaseContext.Provider value={{ user, login, logout, isLoggedIn, isInitialized, firebaseRegister }}>{children}</FirebaseContext.Provider>;
};

export default FirebaseContext;
