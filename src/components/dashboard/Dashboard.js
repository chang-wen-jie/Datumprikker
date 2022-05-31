import { db, auth, logout } from '../../firebase/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Divider, Button } from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

const styles = {
  routerLinkStyle: { textDecoration: 'none', color: 'inherit' },

  iconButtonStyle: {
    minWidth: '0',
    height: '2em',
    width: '2em',
  },
};

export default function Dashboard() {
  const usersRef = collection(db, "users");
  const [user, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const fetchDisplayName = async () => {
    if(user) {
      try {
        const q = query(usersRef, where("uid", "==", user.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.displayName);
      } catch (err) {
        console.error("Onbereikbare gebruikersnaam:", err);
        alert("Er is iets misgegaan met het ophalen van de gebruikersnaam");
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/events');
    }
    fetchDisplayName();
  }, [user, location, navigate]);

  return (
    <div className='app'>
      <div className='header'>
        <div className='header-title'>
          <Link to={`/`} style={styles.routerLinkStyle}>
            budget datumprikker
          </Link>
        </div>
        <div className='header-menu'>
          <Link to={`/form`} style={styles.routerLinkStyle}>
            <li>
              afspraak aanmaken
              <Button
                style={styles.iconButtonStyle}
                sx={{
                  marginLeft: '15px',
                  backgroundColor: '#47d074',
                  '&:disabled': {
                    color: 'white',
                  },
                }}
                disabled
              >
                <PushPinOutlinedIcon />
              </Button>
            </li>
          </Link>
        {
          user ?
            <li>
              {name}
                <Button
                  onClick={logout}
                  style={styles.iconButtonStyle}
                  sx={{
                    marginLeft: '15px',
                    backgroundColor: '#e7e7e7',
                    '&:disabled': {
                      color: '#999',
                    },
                  }}
                >
                <LogoutIcon />
              </Button>
            </li>
          :
            <Link to={`/login`} style={styles.routerLinkStyle}>
              <li>
                inloggen
                  <Button
                    style={styles.iconButtonStyle}
                    sx={{
                      marginLeft: '15px',
                      backgroundColor: '#e7e7e7',
                      '&:disabled': {
                        color: '#999',
                      },
                    }}
                    disabled
                  >
                  <PersonOutlinedIcon />
                </Button>
              </li>
            </Link>
        }
        </div>
      </div>
      <Divider />
      <Outlet />
    </div>
  );
}
