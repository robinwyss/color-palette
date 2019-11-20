import React from "react";
import styles from "./NavBar.module.css";
import { useAuth0 } from "../lib/react-auth0";

const NavBar: React.SFC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className={styles.navigation}>
      <div className={styles.title}>
        <div>Colors</div>
      </div>
      <div>
        {!isAuthenticated && <button onClick={() => loginWithRedirect({})}>Log in</button>}

        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      </div>
    </nav>
  );
};

export default NavBar;
