import React from "react";
import "./TextInput.css";

interface Props {
  onChange(value: string): any;
  value: string | undefined;
  placeholder?: string;
  color?: string;
}

const TextInput: React.SFC<Props> = (props: Props) => {
  let color = props.color || "#000000";
  return (
    <input
      type="text"
      style={{ color }}
      value={props.value}
      className="defaultInput"
      onChange={e => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
};

export default TextInput;
