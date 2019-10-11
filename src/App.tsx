import React from 'react';
import './App.css';
import Palette from './components/Palette'
import PaletteEditor from './components/PaletteEditor'

interface Props {
}

interface State {
  colors: string[];
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      colors: new Array<string>()
    }
  }

  componentDidMount() {
    localStorage.getItem('data')
  }

  saveNewColors(colors: string[]) {
    this.setState({ colors })
  }

  render() {
    // let colors = ["#1e2223", "#292f31", "#353d3e", "#414a4c"];
    return (
      <div className="App">
        <div className="appContainer">
          <div className="box">
            <Palette colors={this.state.colors}></Palette>
          </div>
          <div className="box">
            <PaletteEditor save={(c) => this.saveNewColors(c)}></PaletteEditor>
          </div>
        </div>
      </div>
    )
  }
}

export default App