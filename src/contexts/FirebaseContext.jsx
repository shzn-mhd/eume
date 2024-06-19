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
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { app } from 'config/firebase';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

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
  isInitialized: false,
  // user: null
  user: {
    id: null,
    email: null,
    name: null,
    role: null,
    firstName: null,
    lastName: null
  }
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect(
  //   () =>
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         dispatch({
  //           type: LOGIN,
  //           payload: {
  //             isLoggedIn: true,
  //             user: {
  //               id: user.uid,
  //               email: user.email,
  //               name: user.displayName || 'Stebin Ben',
  //               role: 'UI/UX Designer'
  //             }
  //           }
  //         });
  //       } else {
  //         dispatch({
  //           type: LOGOUT
  //         });
  //       }
  //     }),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [dispatch]
  // );

  // useEffect(() => {
  //   const auth = getAuth(app);
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     console.log("logged in user>>", user);
  //     if (user) {
  //       dispatch({
  //         type: LOGIN,
  //         payload: {
  //           isLoggedIn: true,
  //           user: {
  //             id: user.uid,
  //             email: user.email,
  //             name: user.displayName || 'Stebin Ben',
  //             role: 'UI/UX Designer'
  //           }
  //         }
  //       });
  //     } else {
  //       dispatch({ type: LOGOUT });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [dispatch]);

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
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email,
                name: user.displayName || 'Stebin Ben',
                role: userData.role ||'',
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
