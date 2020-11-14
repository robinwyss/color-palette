import { ColorScheme } from "../Types";
import React from "react";
import ReactDOMServer from "react-dom/server";

export type Size = { width: number; height: number };

export const createSvg = (scheme: ColorScheme, size: Size) => {
  var svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size.width}
      height={size.height}
      version="1.1"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      <rect width="100%" height="100%" fill="#FFFFFF" />
      <text x="10" y="20">
        {scheme.name}
      </text>
      {scheme.palettes.map((palette, index) => (
        <g transform={"translate(10," + (index * 180 + 50) + ")"} key={index}>
          <text>{palette.name}</text>
          {palette.colors.map((color, index) => (
            <g transform={"translate(" + index * 100 + ",10)"} key={index}>
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
  return ReactDOMServer.renderToString(svg);
};

export const calculateRequiredSize = (scheme: ColorScheme): Size => {
  var maxWidth = scheme.palettes
    .map(p => p.colors.length * 100)
    .reduce((previousWidth, width) => (width > previousWidth ? width : previousWidth));
  var height = scheme.palettes.length * 160;
  return { width: maxWidth + 20, height: height + 60 };
};