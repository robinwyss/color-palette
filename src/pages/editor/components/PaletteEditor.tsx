import React from "react";
import styles from "./PaletteEditor.module.css";
import { ColorPalette, Color } from "../../../lib/Types";
import ColorEditor from "./ColorEditor";
import TextInput from "../../../components/TextInput";

interface Props {
  palette?: ColorPalette;
}

interface State {
  palette: ColorPalette;
}

class PaletteEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      palette: props.palette || { name: "", colors: [{ colorCode: "#FFFFFF" }] }
    };
  }

  addColor = () => {
    var { palette } = this.state;
    palette.colors.push({ name: "", colorCode: "#FFFFFF" });
    this.setState({ palette });
  };

  setColorName(color: Color, name: string) {
    color.name = name;
  }

  updateName = (name: string) => {
    var { palette } = this.state;
    palette.name = name;
    this.setState({ palette });
  };

  render() {
    var { palette } = this.state;
    return (
      <div>
        <div>
          <TextInput value={palette.name} onChange={this.updateName} placeholder="Palette Name" />
        </div>
        <div className={styles.colorPalette}>
          {palette.colors.map((color, index) => (
            <div key={index} className={styles.colorItem}>
              <ColorEditor color={color} key={color.colorCode}></ColorEditor>
            </div>
          ))}
          <div className={styles.addColor}>
            <button className={styles.addBtn} onClick={this.addColor}>
              Add Color
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PaletteEditor;
