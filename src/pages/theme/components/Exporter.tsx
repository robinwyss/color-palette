import React from "react";
import { ColorTheme } from "../../../lib/Types";
import Palette from "./Palette";
import { read } from "fs";

interface Props {
  theme: ColorTheme;
}

const Exporter: React.SFC<Props> = ({ theme }) => {
  var svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      version="1.1"
      font-family="Arial, Helvetica, sans-serif"
    >
      <text x="10" y="20">
        {theme.name}
      </text>
      {theme.palettes.map((palette, index) => (
        <g transform={"translate(10," + (index * 160 + 50) + ")"}>
          <text>{palette.name}</text>
          {palette.colors.map((color, index) => (
            <g transform={"translate(" + index * 100 + ",10)"}>
              <rect fill={color.colorCode} stroke="#000000" width="100" height="100"></rect>
              <text x="5" y="120" width="100">
                {color.colorCode}
              </text>
              <text x="5" y="140" width="100">
                {color.name}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );

  return svg;
};

export default Exporter;
