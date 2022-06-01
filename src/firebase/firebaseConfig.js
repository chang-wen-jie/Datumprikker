import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBMPPuc8DLr1LNq4PpkTL2ztUmvbm2kufE',
  authDomain: 'datumprikker-ceccd.firebaseapp.com',
  projectId: 'datumprikker-ceccd',
  storageBucket: 'datumprikker-ceccd.appspot.com',
  messagingSenderId: '162944613143',
  appId: '1:162944613143:web:409f47d96ac087821b5552',
  measurementId: 'G-R0BZ6PX4X7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
    const userDocs = await getDocs(userQuery);

    if (userDocs.docs.length === 0) {
      await setDoc(doc(db, 'users', user.uid), {
        authProvider: 'Google',
        displayName: user.displayName,
        email: user.email,
      });
    }
  } catch (err) {
    console.error('Inloggen mislukt:', err);
    alert('Er is iets misgegaan met het inloggen');
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout };
