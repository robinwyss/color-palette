import React from "react";
import TextInput from "./TextInput";
import { colorValid } from "../lib/ColorUtils";
import { SketchPicker } from "react-color";
import styles from "./ColorInput.module.css";

interface Props {
  onChange(value: string): any;
  value: string;
  placeholder?: string;
  color?: string;
}

interface State {
  color: string;
  valid: boolean;
  displayColorPicker: boolean;
}

class ColorInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: props.value,
      valid: colorValid(props.value),
      displayColorPicker: false
    };
  }

  updateColor = (color: string) => {
    color = color.toUpperCase();
    this.setState({ color });
    if (colorValid(color)) {
      this.props.onChange(color);
    }
  };

  toggleColorPicker = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  render() {
    return (
      <div className={styles.colorInput}>
        <TextInput
          value={this.state.color}
          onChange={this.updateColor}
          placeholder={this.props.placeholder}
          color={this.props.color}
        />
        <button onClick={this.toggleColorPicker}>
          <span role="img" aria-label="choose color">🎨</span>
        </button>
        {this.state.displayColorPicker ? (
          <div className={styles.colorPicker}>
            <div className={styles.cover} onClick={this.toggleColorPicker} />
            <SketchPicker color={this.state.color} onChange={c => this.updateColor(c.hex)} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorInput;
