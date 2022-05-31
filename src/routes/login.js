import { auth, signInWithGoogle } from '../firebase/firebaseConfig';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
  const [user, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <>
      <div className="stepper-title" style={{ textAlign: 'center' }}>
        <b>
          <h1>Aanmelden</h1>
        </b>
        <br></br>
        <p>Meld aan met Google</p>
      </div>
      <center>
        <div className="login-container">
          <div className="user-icon-wrapper">
            <img
              className="user-icon"
              src={require('./../styles/img/user-icon.png')}
            />
          </div>
          <div className="google-btn-wrapper">
            <button className="google-btn" onClick={signInWithGoogle}>
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p>Inloggen met Google</p>
            </button>
          </div>
        </div>
      </center>
    </>
  );
}
