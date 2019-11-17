import React from "react";
import { RouteComponentProps } from "react-router";
import PaletteEditor from "./components/PaletteEditor";
import { ColorTheme } from "../../lib/Types";
import styles from "./index.module.css";
import TextInput from "../../components/TextInput";
import { saveTheme, loadTheme } from "../../lib/LocalStorage";
import { NavLink } from "react-router-dom";

interface MatchParams {
  themeId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  theme: ColorTheme;
  editName: boolean;
}

class ThemeEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let theme = this.getTheme(props);
    this.state = {
      theme,
      editName: true
    };
  }

  getTheme(props: Props) {
    if (props.match.params.themeId) {
      var theme = loadTheme(props.match.params.themeId);
    }
    if (!theme) {
      return { name: "", id: "", palettes: [] };
    } else {
      return theme;
    }
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
    saveTheme(theme);
    this.props.history.push("/theme/" + theme.id);
  };

  render() {
    var { theme } = this.state;
    return (
      <div>
        <div className={styles.themeTitle}>
          <TextInput value={theme.name} onChange={this.updateName} placeholder="Theme Name"></TextInput>
        </div>
        {theme.palettes.map(palette => (
          <PaletteEditor palette={palette} key={palette.name}></PaletteEditor>
        ))}
        <div>
          <button className={styles.addBtn} onClick={this.addPalette}>
            Add Palette
          </button>
        </div>
        <div>
          <button onClick={this.save}>Save</button>
          <NavLink to="/">
            <button>Cancel</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default ThemeEditor;
