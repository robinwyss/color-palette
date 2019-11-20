import React from "react";
import styles from "./App.module.css";
import { ColorScheme } from "./lib/Types";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { loadSchemes } from "./lib/LocalStorage";
import Scheme from "./pages/scheme";
import Overview from "./pages/overview";
import SchemeEditor from "./pages/editor";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./lib/react-auth0";

const App: React.SFC = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar></NavBar>
      <BrowserRouter>
        <div>
          <div className={styles.appContainer}>
            <div className={styles.box}>
              <Switch>
                <Route exact path="/" component={Overview} />
                <Route path="/scheme/:schemeId" component={Scheme} />
                <Route path="/editor/:schemeId?" component={SchemeEditor} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
