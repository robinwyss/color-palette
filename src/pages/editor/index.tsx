import React from "react";
import PaletteEditor from "./components/PaletteEditor";
import { ColorTheme } from "../../lib/Types";
import "./index.css";
import TextInput from "../../components/TextInput";

interface Props {}

interface State {
  theme: ColorTheme;
  editName: boolean;
}

class ThemeEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theme: { name: "", id: "", palettes: [] },
      editName: true
    };
  }

  updateName = (name: string) => {
    var { theme } = this.state;
    theme.name = name;
    this.setState({ theme });
  };

  addPalette = () => {
    var { theme } = this.state;
    theme.palettes.push({ colors: [], name: "" });
    this.setState({ theme });
  };

  save = () => {
    var { theme } = this.state;
    console.log(theme);
  };

  render() {
    var { theme } = this.state;
    return (
      <div>
        <div className="themeTitle">
          <TextInput value={theme.name} onChange={this.updateName} placeholder="Theme Name"></TextInput>
        </div>
        {theme.palettes.map(palette => (
          <PaletteEditor palette={palette} key={palette.name}></PaletteEditor>
        ))}
        <div>
          <button className="addBtn" onClick={this.addPalette}>
            Add Palette
          </button>
        </div>
        <div>
          <button onClick={this.save}>Save</button>
        </div>
      </div>
    );
  }
}

export default ThemeEditor;
