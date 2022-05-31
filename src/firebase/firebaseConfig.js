import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
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
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: 'Google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout };
