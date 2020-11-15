import React from "react";
import styles from "./Palette.module.css";
import { ColorPalette } from "../../../lib/Types";

interface PaletteProps {
  palette: ColorPalette;
}

const Palette: React.FC<PaletteProps> = ({ palette }) => {
  return (
    <div className={styles.colorPalette}>
      {palette.colors.map(c => (
        <div key={c.id} className={styles.color} style={{ backgroundColor: c.colorCode }}>
          {c.colorCode} - {c.name}
        </div>
      ))}
    </div>
  );
};

export default Palette;
