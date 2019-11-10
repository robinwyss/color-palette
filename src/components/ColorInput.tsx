import React from "react";
import "./TextInput.css";
import TextInput from "./TextInput";
import { colorValid } from "../lib/ColorUtils";

interface Props {
  onChange(value: string): any;
  value: string;
  placeholder?: string;
  color?: string;
}

interface State {
  color: string;
  valid: boolean;
}

class ColorInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: props.value,
      valid: colorValid(props.value)
    };
  }

  updateColor = (color: string) => {
    color = color.toUpperCase();
    this.setState({ color });
    if (colorValid(color)) {
      this.props.onChange(color);
    }
  };

  render() {
    return (
      <TextInput
        value={this.state.color}
        onChange={this.updateColor}
        placeholder={this.props.placeholder}
        color={this.props.color}
      />
    );
  }
}

export default ColorInput;
