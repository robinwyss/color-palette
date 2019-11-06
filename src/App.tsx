import React from "react";
import "./App.css";
import { ColorTheme } from "./lib/Types";
import { BrowserRouter, NavLink, Route } from "react-router-dom"
import { loadThemes, saveTheme } from "./lib/Storage"
import Theme from './pages/Theme'

interface Props { }

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
    let colorThemes = loadThemes()
    this.setState({ colorThemes });
  }

  // saveNewColors(colors: string[]) {
  //   let colorPalettes = [...this.state.colorThemes, colors];
  //   this.setState({ colorPalettes });
  //   localStorage.setItem("colorPalettes", JSON.stringify(colorPalettes));
  // }

  render() {
    // let colors = ["#1e2223", "#292f31", "#353d3e", "#414a4c"];
    return (
      <BrowserRouter>
        <div className="App">
          <div className="appContainer">
            <div className="box">
              <ul>
                {this.state.colorThemes.map(theme => (
                  <li><NavLink to={'/' + theme.name} >{theme.name}</NavLink></li>
                  // <Palette colors={colors}></Palette>
                ))}
              </ul>
            </div>
            <div className="box">
              <Route path="/:themeId" component={Theme} />
              {/* <PaletteEditor save={c => this.saveNewColors(c)}></PaletteEditor> */}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
