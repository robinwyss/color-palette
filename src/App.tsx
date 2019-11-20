import React from "react";
import styles from "./App.module.css";
import { ColorTheme } from "./lib/Types";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { loadThemes } from "./lib/LocalStorage";
import Theme from "./pages/theme";
import Overview from "./pages/overview";
import ThemeEditor from "./pages/editor";

interface Props {}

interface State {
  colorThemes: ColorTheme[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      colorThemes: []
    };
  }

  componentDidMount() {
    let colorThemes = loadThemes();
    this.setState({ colorThemes });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className={styles.appContainer}>
            <div className={styles.box}>
              <Switch>
                <Route exact path="/" component={Overview} />
                <Route path="/theme/:themeId" component={Theme} />
                <Route path="/editor/:themeId?" component={ThemeEditor} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
