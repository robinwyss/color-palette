import React from "react";
import { RouteComponentProps } from "react-router";
import PaletteEditor from "./components/PaletteEditor";
import { ColorScheme } from "../../lib/Types";
import styles from "./index.module.css";
import TextInput from "../../components/TextInput";
import { saveScheme, loadScheme } from "../../lib/LocalStorage";
import { NavLink } from "react-router-dom";

interface MatchParams {
  schemeId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

interface State {
  scheme: ColorScheme;
  editName: boolean;
}

class SchemeEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let scheme = this.getScheme(props);
    this.state = {
      scheme,
      editName: true
    };
  }

  getScheme(props: Props) {
    if (props.match.params.schemeId) {
      var scheme = loadScheme(props.match.params.schemeId);
    }
    if (!scheme) {
      return { name: "", id: "", palettes: [] };
    } else {
      return scheme;
    }
  }

  updateName = (name: string) => {
    var { scheme } = this.state;
    scheme.name = name;
    this.setState({ scheme });
  };

  addPalette = () => {
    var { scheme } = this.state;
    scheme.palettes.push({ colors: [], name: "" });
    this.setState({ scheme });
  };

  save = () => {
    var { scheme } = this.state;
    saveScheme(scheme);
    this.props.history.push("/scheme/" + scheme.id);
  };

  deletePalette = (index: number) => {
    var { scheme } = this.state;
    scheme.palettes.splice(index, 1);
    this.setState({ scheme });
  }

  render() {
    var { scheme } = this.state;
    return (
      <div>
        <div className={styles.schemeTitle}>
          <TextInput value={scheme.name} onChange={this.updateName} placeholder="Scheme Name"></TextInput>
        </div>
        {scheme.palettes.map((palette, index) => (
          <div>
            <PaletteEditor palette={palette} key={index}></PaletteEditor>
            <button onClick={() => this.deletePalette(index)}>delete</button>
          </div>
        ))}
        <div>
          <button className={styles.addBtn} onClick={this.addPalette}>
            Add Palette
          </button>
        </div>
        <div>
          <button onClick={this.save}>Save</button>
          <NavLink to={"/scheme/" + scheme.id}>
            <button>Cancel</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SchemeEditor;
