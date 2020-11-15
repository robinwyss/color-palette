import React from "react";
import styles from "./TextInput.module.css";

interface Props {
  onChange(value: string): any;
  value: string | undefined;
  placeholder?: string;
  color?: string;
}

const TextInput: React.FunctionComponent<Props> = (props: Props) => {
  let color = props.color || "#000000";
  return (
    <input
      type="text"
      style={{ color }}
      value={props.value || ''}
      className={styles.defaultInput}
      onChange={e => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
};

export default TextInput;
