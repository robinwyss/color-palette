import React from "react";
import { RouteComponentProps } from "react-router";
import PaletteEditor from "./components/PaletteEditor";
import { ColorScheme, ColorPalette } from "../../lib/Types";
import styles from "./index.module.css";
import TextInput from "../../components/TextInput";
import { saveScheme, loadScheme, deleteScheme } from "../../lib/LocalStorage";

interface MatchParams {
  schemeId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

interface State {
  scheme: ColorScheme;
  saved: boolean;
}

class SchemeEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let scheme = this.getScheme(props);
    this.state = {
      scheme,
      saved: false
    };
  }

  componentDidUpdate() {
    this.save();
  }

  getScheme(props: Props) {
    if (props.match.params.schemeId) {
      var scheme = loadScheme(props.match.params.schemeId);
    }
    if (!scheme) {
      return new ColorScheme();
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
    scheme.palettes.push(new ColorPalette());
    this.setState({ scheme });
  };

  save = () => {
    var { scheme } = this.state;
    saveScheme(scheme);
    if (!this.state.saved) {
      this.setState({ saved: true })
    }
    // this.props.history.push("/scheme/" + scheme.id);
  };

  delete = () => {
    var { scheme } = this.state;
    deleteScheme(scheme);
    this.props.history.push("/");
  }

  deletePalette = (paletteId: string) => {
    var { scheme } = this.state;
    let index = scheme.palettes.findIndex(p => p.id === paletteId);
    if (index >= 0) {
      scheme.palettes.splice(index, 1);
    }
    this.setState({ scheme });
  }

  back = () => {
    if (this.state.saved) {
      this.props.history.push("/scheme/" + this.state.scheme.id);
    } else {
      this.props.history.push("/");
    }
  }

  swapItemWithNext = (index: number) => {
    const { scheme } = this.state;
    var item = scheme.palettes.splice(index, 1)[0];
    scheme.palettes.splice(index + 1, 0, item);
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
          <div key={palette.id}>
            <PaletteEditor notifyChange={this.save} palette={palette}></PaletteEditor>
            <button onClick={() => this.deletePalette(palette.id)}>Delete</button>
            {index < (scheme.palettes.length - 1) && (<button onClick={() => this.swapItemWithNext(index)}>SWAP</button>)}
          </div>
        ))}
        <div>
          <button className={styles.addBtn} onClick={this.addPalette}>
            Add Palette
          </button>
        </div>
        <div>
          <button onClick={this.save}>Save</button>
          <button onClick={this.back}>Back</button>
          <button onClick={this.delete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default SchemeEditor;
