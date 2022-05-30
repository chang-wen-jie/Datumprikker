import "./App.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Divider, Button } from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const styles = {
  routerLinkStyle: { textDecoration: "none", color: "inherit" },
  
  iconButtonStyle: {
    minWidth: "0",
    height: "2em",
    width: "2em",
  },
};

export default function Dashboard() {
  return (
    <div className="app">
      <div className="header">
        <div className="header-title">
          <Link to={`../`} style={styles.routerLinkStyle}>
            budget datumprikker
          </Link>
        </div>
        <div className="header-menu">
            <Link to={`/form`} style={styles.routerLinkStyle}>
              <li>
                afspraak aanmaken
                <Button
                  style={styles.iconButtonStyle}
                  sx={{
                    marginLeft: "15px",
                    backgroundColor: "#47d074",
                    "&:disabled": {
                      color: 'white',
                    },
                  }}
                  disabled
                >
                  <PushPinOutlinedIcon />
                </Button>
              </li>
            </Link>
            <Link to={`/login`} style={styles.routerLinkStyle}>
              <li>
                inloggen
                <Button
                  style={styles.iconButtonStyle}
                  sx={{
                    marginLeft: "15px",
                    backgroundColor: "#e7e7e7",
                    "&:disabled": {
                      color: "#999",
                    },
                  }}
                  disabled
                >
                  <PersonOutlinedIcon />
                </Button>
              </li>
            </Link>
        </div>
      </div>
      <Divider />
      <Outlet />
      awefawefawefawefawefaewf
    </div>
  );
}

export function App() {
  return (
    // <div className="app">
    //   <div className="header">
    //     <div className="header-title">
    //       <Link to={`../`} style={styles.routerLinkStyle}>
    //         budget datumprikker
    //       </Link>
    //     </div>
    //     <div className="header-menu">
    //         <Link to={`/form`} style={styles.routerLinkStyle}>
    //           <li>
    //             afspraak aanmaken
    //             <Button
    //               style={styles.iconButtonStyle}
    //               sx={{
    //                 marginLeft: "15px",
    //                 backgroundColor: "#47d074",
    //                 "&:disabled": {
    //                   color: 'white',
    //                 },
    //               }}
    //               disabled
    //             >
    //               <PushPinOutlinedIcon />
    //             </Button>
    //           </li>
    //         </Link>
    //         <Link to={`/login`} style={styles.routerLinkStyle}>
    //           <li>
    //             inloggen
    //             <Button
    //               style={styles.iconButtonStyle}
    //               sx={{
    //                 marginLeft: "15px",
    //                 backgroundColor: "#e7e7e7",
    //                 "&:disabled": {
    //                   color: "#999",
    //                 },
    //               }}
    //               disabled
    //             >
    //               <PersonOutlinedIcon />
    //             </Button>
    //           </li>
    //         </Link>
    //     </div>
    //   </div>
    //   <Divider />
    //   <Outlet />
    //   awefawefawefawefawefaewf
    // </div>
    <>
      wat gebeurt hier
    </>
  );
}
