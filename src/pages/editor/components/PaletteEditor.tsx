import React from "react";
import styles from "./PaletteEditor.module.css";
import { ColorPalette, Color } from "../../../lib/Types";
import ColorEditor from "./ColorEditor";
import TextInput from "../../../components/TextInput";

interface Props {
  palette?: ColorPalette;
  notifyChange: () => void
}

interface State {
  palette: ColorPalette;
}

class PaletteEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      palette: props.palette || new ColorPalette()
    }
  }

  addColor = () => {
    var { palette } = this.state;
    palette.colors.push(new Color())
    this.props.notifyChange();
    this.setState({ palette });
  };

  updateName = (name: string) => {
    var { palette } = this.state;
    palette.name = name;
    this.props.notifyChange();
    this.setState({ palette });
  };

  deleteColor = (colorId: string) => {
    const { palette } = this.state;
    const index = palette.colors.findIndex(c => c.id === colorId);
    if (index >= 0) {
      palette.colors.splice(index, 1);
    }
    this.props.notifyChange();
    this.setState({ palette });
  }

  swapItemWithNext = (index: number) => {
    const { palette } = this.state;
    var item = palette.colors.splice(index, 1)[0];
    palette.colors.splice(index + 1, 0, item);
    this.setState({ palette });
  }
  
  render() {
    var { palette } = this.state;
    return (
      <div>
        <div>
          <TextInput value={palette.name} onChange={this.updateName} placeholder="Palette Name" />
        </div>
        <div className={styles.paletteEditor}>
          <div className={styles.colorPalette}>
            {palette.colors.map((color, index) => (
              <div key={color.id} className={styles.colorItem}>
                <ColorEditor notifyChange={this.props.notifyChange} color={color}></ColorEditor>
                <button onClick={() => this.deleteColor(color.id)}>Delete</button>
                {index < (palette.colors.length - 1) && (<button onClick={() => this.swapItemWithNext(index)}>SWAP</button>)}
              </div>
            ))}
          </div>
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
