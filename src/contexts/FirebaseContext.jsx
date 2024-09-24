import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// action - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { app } from 'config/firebase';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import useLocalStorageFunctions from 'hooks/useLocalStorageFunctions';

// firebase initialize
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
//   });
// }

// const
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

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {getLocalstorageValue} = useLocalStorageFunctions();
  console.log("AuthState", state)
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        const firestore = getFirestore(app);
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          // const roleDocRef = doc(firestore, 'roles', userData.role);
          // const roleDocSnapshot = await getDoc(roleDocRef);

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
          // if (roleDocSnapshot.exists()) {
          //   roleName = roleDocSnapshot.data().roleName;
          //   rolePermissions = roleDocSnapshot.data().permissions;
          // }
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email,
                name: user.displayName || 'Stebin Ben',
                role: userData.role || '',
                roleName: roleName,
                rolePermissions: rolePermissions,
                firstName: userData.firstName || '',
                lastName: userData.lastName || ''
              }
            }
          });
        } else {
          // Handle case where user document doesn't exist (optional)
          console.log('User document does not exist.');
        }
      } else {
        dispatch({ type: LOGOUT });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // const firebaseEmailPasswordSignIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
  const firebaseEmailPasswordSignIn = (email, password) => {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const firebaseGoogleSignIn = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return firebase.auth().signInWithPopup(provider);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    return signInWithPopup(auth, provider);
  };

  const firebaseTwitterSignIn = () => {
    // const provider = new firebase.auth.TwitterAuthProvider();
    // return firebase.auth().signInWithPopup(provider);
    const provider = new TwitterAuthProvider();
    const auth = getAuth(app);
    return signInWithPopup(auth, provider);
  };

  const firebaseFacebookSignIn = () => {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // return firebase.auth().signInWithPopup(provider);
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);
    return signInWithPopup(auth, provider);
  };

  // const firebaseRegister = async (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

  const firebaseRegister = async (email, password, firstName, lastName, role) => {
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user information in Firestore
    const userDoc = doc(firestore, 'users', user.uid);
    await setDoc(userDoc, {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      role: role
    });
    return userCredential;
  };

  // const logout = () => firebase.auth().signOut();
  const logout = () => {
    const auth = getAuth(app);
    return signOut(auth);
  };

  // const resetPassword = async (email) => {
  //   await firebase.auth().sendPasswordResetEmail(email);
  // };
  const resetPassword = async (email) => {
    const auth = getAuth(app);
    return sendPasswordResetEmail(auth, email);
  };

  const updateProfile = () => {};
  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login: () => {},
        firebaseGoogleSignIn,
        firebaseTwitterSignIn,
        firebaseFacebookSignIn,
        logout,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node
};

export default FirebaseContext;
