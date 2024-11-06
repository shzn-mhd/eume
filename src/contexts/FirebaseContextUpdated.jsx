// FirebaseContext.js
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getFirestore, doc,  collection, query, where, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { app, db } from 'config/firebase';
import authReducer from 'contexts/auth-reducer/auth';
import { v4 as uuidv4 } from 'uuid';

import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import useLocalStorage from 'hooks/useLocalStorage';
import useLocalStorageFunctions from 'hooks/useLocalStorageFunctions';
import { set } from 'lodash';
import { compare, hash } from 'bcryptjs';
import { SHA256 } from 'crypto-js';

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
  const {setLocalstorageValue, getLocalstorageValue} = useLocalStorageFunctions()
  const { isLoggedIn } = state;
  const isInitialized = true;

  useEffect(()=>{
    const userData = getLocalstorageValue("user");
    if(userData){
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: JSON.parse(userData)
        }
      });
      setUser(JSON.parse(userData));
    }
  },[dispatch])

  const login = async (email, password) => {
    try {
      // Get user and if user exists then compare hashed password to given password
      const q = query(collection(db, 'users'), where('email', '==', email));
      
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const firestore = getFirestore(app);
        let roleName = [];
        let rolePermissions = {};

        // Compare hashed password
        const passwordMatch = await compare(password, userData.password);

        if (!passwordMatch) {
          // TODO: Critical - Uncomment following code
          // return { success: false, message: 'Invalid password' };
        }

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

        // Encrypt local storage user data
        // const userPayloadEncrypted = SHA256(JSON.stringify(dispatchData.payload.user)).toString();

        setLocalstorageValue("user", dispatchData.payload.user);
        setUser(dispatchData.payload.user);

        return { success: true, data: userData };

      } else {
        return { success: false, message: 'User does not exisits' };
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, message: 'Failed to log in' };
    }
  };

  const logout = () => {
    setUser(null);
    setLocalstorageValue("user", null);
    dispatch({
      type: LOGOUT,
      payload: {
        isLoggedIn: false,
        user: null
      }
    });
  };

  const firebaseRegister = async (email, password, firstName, lastName, role) => {
    // Check is email already exists
    const q = query(collection(db, 'users'), where('email', '==', email));
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      
      return { success: false, message: 'Email already exists' };
    }

    const firestore = getFirestore(app);
    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // const user = userCredential.user;

    // Store additional user information in Firestore
    const uuid = uuidv4();
    const userDoc = doc(firestore, 'users', uuid);

    // Encrypt password
    const encryptedPassword = await hash(password, 10);

    await setDoc(userDoc, {
      uid: uuid,
      email: email,
      password: encryptedPassword,
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
