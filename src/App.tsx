import React from "react";
import styles from "./App.module.css";
import { ColorScheme } from "./lib/Types";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { loadSchemes } from "./lib/LocalStorage";
import Scheme from "./pages/scheme";
import Overview from "./pages/overview";
import SchemeEditor from "./pages/editor";

interface Props {}

interface State {
  colorSchemes: ColorScheme[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      colorSchemes: []
    };
  }

  componentDidMount() {
    let colorSchemes = loadSchemes();
    this.setState({ colorSchemes });
  }

  render() {
    return (
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
    );
  }
}

export default App;
