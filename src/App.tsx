import React from "react";
import "./App.css";
import Palette from "./components/Palette";
import PaletteEditor from "./components/PaletteEditor";

interface Props {}

interface State {
  colorPalettes: string[][];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      colorPalettes: new Array<string[]>()
    };
  }

  componentDidMount() {
    let storageData = localStorage.getItem("colorPalettes");
    if (storageData) {
      let colorPalettes = JSON.parse(storageData);
      this.setState({ colorPalettes });
    }
  }

  saveNewColors(colors: string[]) {
    let colorPalettes = [...this.state.colorPalettes, colors];
    this.setState({ colorPalettes });
    localStorage.setItem("colorPalettes", JSON.stringify(colorPalettes));
  }

  render() {
    // let colors = ["#1e2223", "#292f31", "#353d3e", "#414a4c"];
    return (
      <div className="App">
        <div className="appContainer">
          <div className="box">
            {this.state.colorPalettes.map(colors => (
              <Palette colors={colors}></Palette>
            ))}
          </div>
          <div className="box">
            <PaletteEditor save={c => this.saveNewColors(c)}></PaletteEditor>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
