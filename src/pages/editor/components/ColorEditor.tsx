import React from "react";
import { Color } from "../../../lib/Types";
import "./ColorEditor.css";
import TextInput from "../../../components/TextInput";
import { getContrast } from "../../../lib/ColorUtils";
import ColorInput from "../../../components/ColorInput";

interface Props {
  color: Color;
}

interface State {
  name?: string;
  colorCode: string;
}

class ColorEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { colorCode: props.color.colorCode, name: props.color.name };
  }

  updateName = (name: string) => {
    this.props.color.name = name;
    this.setState({ name });
  };

  updateColor = (colorCode: string) => {
    this.props.color.colorCode = colorCode;
    this.setState({ colorCode });
  };

  render() {
    var { name, colorCode } = this.state;
    var textColor = getContrast(colorCode);
    return (
      <div>
        <div className="colorEditor" style={{ backgroundColor: colorCode }}>
          <ColorInput
            color={textColor}
            value={colorCode}
            onChange={this.updateColor}
            placeholder="color code (#FFFFFFF)"
          />
          <TextInput color={textColor} value={name} onChange={this.updateName} placeholder="Name (optional)" />
        </div>
      </div>
    );
  }
}

export default ColorEditor;
