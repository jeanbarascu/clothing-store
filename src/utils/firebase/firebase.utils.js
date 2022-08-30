// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promt: 'select_account',
});

// Initialize Firebase
initializeApp(firebaseConfig);

// Auth
export const auth = getAuth();

export const signInGoogleProviderRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

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
        ...additionalInfo,
      });
    } catch (error) {
      console.error('cannot create the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
