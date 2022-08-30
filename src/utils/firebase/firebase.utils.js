// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCV-bPKmgdGBAomZPNfQ1x5Z21E7ZxKlCE',
  authDomain: 'crwn-clothing-db-a3d3d.firebaseapp.com',
  projectId: 'crwn-clothing-db-a3d3d',
  storageBucket: 'crwn-clothing-db-a3d3d.appspot.com',
  messagingSenderId: '930303127036',
  appId: '1:930303127036:web:b49e3bbe83c8d76ea89679',
};

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promt: 'select_account',
});

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth();
export const signInGoogleProvider = () => signInWithPopup(auth, provider);

// DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  const { displayName, email } = userAuth;
  const createdAt = new Date();

  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error('cannot create the user', error.message);
    }
  }

  return userDocRef;
};
